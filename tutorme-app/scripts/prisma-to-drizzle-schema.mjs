#!/usr/bin/env node
/**
 * Converts prisma/schema.prisma to Drizzle schema files.
 * Run from tutorme-app: node scripts/prisma-to-drizzle-schema.mjs
 * Output: src/lib/db/schema/*.ts (enums, then table files by domain)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
const outDir = path.join(process.cwd(), 'src', 'lib', 'db', 'schema');

const content = fs.readFileSync(schemaPath, 'utf-8');
const lines = content.split('\n');

// First pass: collect all model and enum names
const modelNames = new Set();
const enumNames = new Set();
for (const line of lines) {
  const t = line.trim();
  if (t.startsWith('model ')) modelNames.add(t.slice(6).split(/\s/)[0]);
  if (t.startsWith('enum ')) enumNames.add(t.slice(5).split(/\s/)[0]);
}

const enums = [];
const models = [];
let current = null;
let braceDepth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  if (trimmed.startsWith('model ')) {
    const name = trimmed.slice(6).split(/\s/)[0];
    current = { type: 'model', name, fields: [], indexes: [], uniques: [] };
    braceDepth = 0;
    continue;
  }
  if (trimmed.startsWith('enum ')) {
    const name = trimmed.slice(5).split(/\s/)[0];
    current = { type: 'enum', name, values: [] };
    braceDepth = 0;
    continue;
  }
  if (!current) continue;

  // Count braces
  for (const c of line) {
    if (c === '{') braceDepth++;
    if (c === '}') braceDepth--;
  }

  if (current.type === 'enum') {
    if (trimmed.startsWith('}')) {
      enums.push(current);
      current = null;
      continue;
    }
    const val = trimmed.split(/\s/)[0];
    if (val && val !== '}' && !val.startsWith('//')) current.values.push(val);
    continue;
  }

  if (current.type === 'model') {
    if (trimmed.startsWith('}')) {
      models.push(current);
      current = null;
      continue;
    }
    if (trimmed.startsWith('@@unique')) {
      const m = trimmed.match(/@@unique\(\[([^\]]+)\](?:,\s*name:\s*["']?([^"')]+)["']?)?\)/);
      if (m) current.uniques.push({ cols: m[1].split(',').map(s => s.trim()), name: m[2] });
      continue;
    }
    if (trimmed.startsWith('@@index')) {
      const m = trimmed.match(/@@index\(\[([^\]]+)\](?:,\s*name:\s*["']?([^"')]+)["']?)?\)/);
      if (m) current.indexes.push({ cols: m[1].split(',').map(s => s.trim()), name: m[2] });
      continue;
    }
    // Field line: "  fieldName Type? @default(...) @map(...)"
    const fieldMatch = trimmed.match(/^(\w+)\s+(\S+?)(?:\s|$)/);
    if (!fieldMatch) continue;
    const [, fieldName, typePart] = fieldMatch;
    // Skip relation lines (type is another model or has @relation)
    if (line.includes('@relation(')) continue;
    if (typePart.endsWith(']')) {
      const baseType = typePart.replace('[]', '').replace('?', '').trim();
      if (modelNames.has(baseType)) continue; // relation array, skip
      // else String[] etc. - keep as array column
    }
    const baseType = typePart.replace('?', '').trim();
    if (!typePart.endsWith(']') && modelNames.has(baseType)) continue;
    const optional = typePart.endsWith('?') || line.includes('String?') || line.includes('Int?') || line.includes('Float?') || line.includes('Boolean?') || line.includes('DateTime?') || line.includes('Json?');
    const mapMatch = line.match(/@map\(["']([^"']+)["']\)/);
    const dbCol = mapMatch ? mapMatch[1] : fieldName;
    const defaultCuid = line.includes('@default(cuid())');
    const defaultNow = line.includes('@default(now())');
    const updatedAt = line.includes('@updatedAt');
    const unique = line.includes('@unique') && !line.includes('@@unique');
    const isId = fieldName === 'id' && line.includes('@id');
    current.fields.push({
      name: fieldName,
      dbCol,
      type: typePart.replace('?', ''),
      optional,
      defaultCuid,
      defaultNow,
      updatedAt,
      unique,
      isId,
    });
  }
}

function tsType(prismaType, enumName) {
  const t = prismaType;
  if (t === 'String') return 'text';
  if (t === 'Int') return 'integer';
  if (t === 'Float') return 'doublePrecision';
  if (t === 'Boolean') return 'boolean';
  if (t === 'DateTime') return 'timestamp';
  if (t === 'Json') return 'jsonb';
  if (t.endsWith('[]')) return 'textArray'; // String[] -> text array
  if (enums.some(e => e.name === t)) return 'enum';
  return 'text';
}

function colDef(f, enumRefs) {
  const type = tsType(f.type, f.name);
  const nullable = f.optional ? '' : '.notNull()';
  let def = '';
  if (f.defaultNow) def = '.defaultNow()';
  else if (f.updatedAt) def = '.$onUpdate(() => new Date())';
  else if (f.defaultCuid) def = ''; // app provides
  const uniq = f.unique ? '.unique()' : '';
  const colName = `'${f.dbCol}'`;
  if (type === 'text') return `  ${f.name}: text(${colName})${nullable}${def}${uniq}`;
  if (type === 'integer') return `  ${f.name}: integer(${colName})${nullable}${def}${uniq}`;
  if (type === 'doublePrecision') return `  ${f.name}: doublePrecision(${colName})${nullable}${def}${uniq}`;
  if (type === 'boolean') return `  ${f.name}: boolean(${colName})${nullable}${def}${uniq}`;
  if (type === 'timestamp') return `  ${f.name}: timestamp(${colName}, { withTimezone: true })${nullable}${def}${uniq}`;
  if (type === 'jsonb') return `  ${f.name}: jsonb(${colName})${nullable}${def}${uniq}`;
  if (type === 'textArray') return `  ${f.name}: text(${colName}).array()${nullable}${def}${uniq}`;
  if (type === 'enum') {
    const en = enums.find(e => e.name === f.type);
    const enumVar = en ? (en.name.charAt(0).toLowerCase() + en.name.slice(1)) + 'Enum' : 'roleEnum';
    return `  ${f.name}: ${enumVar}(${colName})${nullable}${def}${uniq}`;
  }
  return `  ${f.name}: text(${colName})${nullable}${def}${uniq}`;
}

// Build enum var names
const enumVarNames = {};
enums.forEach(e => {
  enumVarNames[e.name] = e.name.charAt(0).toLowerCase() + e.name.slice(1) + 'Enum';
});

// Output enums.ts
let enumOut = `/**
 * Drizzle enums (generated from Prisma schema).
 */
import { pgEnum } from 'drizzle-orm/pg-core'

`;
enums.forEach(e => {
  const varName = enumVarNames[e.name];
  // Prisma uses PascalCase enum names in PostgreSQL
  enumOut += `export const ${varName} = pgEnum('${e.name}', [${e.values.map(v => `'${v}'`).join(', ')}])\n\n`;
});
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'enums.ts'), enumOut);

function colDefFixed(f) {
  const type = tsType(f.type, f.name);
  const nullable = f.optional ? '' : '.notNull()';
  let def = '';
  if (f.defaultNow) def = '.defaultNow()';
  else if (f.updatedAt) def = '.$onUpdate(() => new Date())';
  else if (f.defaultCuid) def = '';
  const uniq = f.unique ? '.unique()' : '';
  const pk = f.isId ? '.primaryKey()' : '';
  const colName = `'${f.dbCol}'`;
  if (type === 'text') return `  ${f.name}: text(${colName})${pk}${nullable}${def}${uniq}`;
  if (type === 'integer') return `  ${f.name}: integer(${colName})${pk}${nullable}${def}${uniq}`;
  if (type === 'doublePrecision') return `  ${f.name}: doublePrecision(${colName})${pk}${nullable}${def}${uniq}`;
  if (type === 'boolean') return `  ${f.name}: boolean(${colName})${pk}${nullable}${def}${uniq}`;
  if (type === 'timestamp') return `  ${f.name}: timestamp(${colName}, { withTimezone: true })${pk}${nullable}${def}${uniq}`;
  if (type === 'jsonb') return `  ${f.name}: jsonb(${colName})${pk}${nullable}${def}${uniq}`;
  if (type === 'textArray') return `  ${f.name}: text(${colName}).array()${pk}${nullable}${def}${uniq}`;
  if (type === 'enum') {
    const enumVar = enumVarNames[f.type] || 'roleEnum';
    return `  ${f.name}: enums.${enumVar}(${colName})${pk}${nullable}${def}${uniq}`;
  }
  return `  ${f.name}: text(${colName})${pk}${nullable}${def}${uniq}`;
}

// Tables file: pgTable with (table) => ({ ... }) for indexes
const tablesOut2 = [];
tablesOut2.push(`/**
 * Drizzle table definitions (generated from Prisma schema).
 * Do not edit by hand; re-run: node scripts/prisma-to-drizzle-schema.mjs
 */
import { pgTable, text, integer, boolean, timestamp, jsonb, doublePrecision, uniqueIndex, index } from 'drizzle-orm/pg-core'
import * as enums from './enums'
`);

models.forEach(m => {
  const cols = m.fields.map(f => colDefFixed(f)).filter(Boolean);
  const tableVar = m.name.charAt(0).toLowerCase() + m.name.slice(1);
  let tableDef = `export const ${tableVar} = pgTable('${m.name}', {\n${cols.join(',\n')}\n}`;
  const indexEntries = [];
  m.indexes.forEach(ix => {
    const name = (ix.name || `${m.name}_${ix.cols.join('_')}_idx`).replace(/[^a-zA-Z0-9_]/g, '_');
    indexEntries.push(`  ${name}: index('${name}').on(${ix.cols.map(c => `table.${c}`).join(', ')})`);
  });
  m.uniques.forEach(u => {
    const name = (u.name || `${m.name}_${u.cols.join('_')}_key`).replace(/[^a-zA-Z0-9_]/g, '_');
    indexEntries.push(`  ${name}: uniqueIndex('${name}').on(${u.cols.map(c => `table.${c}`).join(', ')})`);
  });
  if (indexEntries.length) {
    tableDef += `, (table) => ({\n${indexEntries.join(',\n')}\n})`;
  }
  tableDef += ')';
  tablesOut2.push(tableDef + '\n');
});

fs.writeFileSync(path.join(outDir, 'tables.ts'), tablesOut2.join('\n'));

// index() returns something that goes in the second arg; the second arg to pgTable is (table) => ({ name: index().on(table.x) }). So the name in index('xxx') is the DB index name. Good.

// index.ts: export enums and all tables; also add NextAuth Session and VerificationToken if not present
const hasSession = models.some(m => m.name === 'Session');
const hasVerificationToken = models.some(m => m.name === 'VerificationToken');

let indexContent = `/**
 * Drizzle schema - re-exports enums and tables.
 */
export * from './enums'
export * from './tables'
`;
if (!hasSession || !hasVerificationToken) {
  indexContent += `
// NextAuth tables (add to tables.ts or define here if not in Prisma)
`;
}
fs.writeFileSync(path.join(outDir, 'index.ts'), indexContent);

console.log('Generated:', enums.length, 'enums,', models.length, 'tables');
console.log('Output:', outDir);
