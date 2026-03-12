const fs = require('fs');
const path = 'e:\\Tutormee\\Tutor\\tutorme-app\\src\\app\\[locale]\\tutor\\dashboard\\components\\CourseBuilder.tsx';
let content = fs.readFileSync(path, 'utf8');

const TABS_LIST_STYLE = 'neon-border-inner p-1 rounded-xl shadow-lg bg-white/50 backdrop-blur-sm';
const TABS_CONTENT_STYLE = 'neon-border-indigo shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md p-6';

// 1. Cleanly update TabsList
// Find all TabsList tags and ensure they have the style exactly once.
content = content.replace(/<TabsList className="([^"]*)"/g, (match, p1) => {
  // Remove existing occurrences of the new classes first to avoid duplication
  let cleaned = p1.replace(/neon-border-inner|shadow-lg|bg-white\/50|backdrop-blur-sm|rounded-xl|p-1/g, '').trim();
  // Remove multiple spaces
  cleaned = cleaned.replace(/\s+/g, ' ');
  return `<TabsList className="${cleaned} ${TABS_LIST_STYLE}"`;
});

// 2. Cleanly update TabsContent (focus on edit and preview)
content = content.replace(/<TabsContent value="(edit|preview)" className="([^"]*)"/g, (match, p1, p2) => {
  let cleaned = p2.replace(/neon-border-indigo|shadow-2xl|rounded-2xl|bg-white\/95|backdrop-blur-md|p-6/g, '').trim();
  cleaned = cleaned.replace(/\s+/g, ' ');
  return `<TabsContent value="${p1}" className="${cleaned} ${TABS_CONTENT_STYLE}"`;
});

// 3. Update common grids (containers only)
// Finding "grid grid-cols-2 gap-4" which is common in modals
content = content.replace(/className="grid grid-cols-2 gap-4"/g, 'className="grid grid-cols-2 gap-4 neon-border-inner p-4 rounded-xl bg-white/30 backdrop-blur-sm shadow-sm"');

// 4. Swap Textarea for AutoTextarea where appropriate
// Replacing the ones for description and instructions (common labels)
content = content.replace(/<Textarea\s+value={(data|q)\.(description|instructions|question|explanation)}/g, '<AutoTextarea value={$1.$2}');

// Ensure import is there (it is, but good to check)
if (!content.includes("import { AutoTextarea }")) {
  content = content.replace("import { Textarea }", "import { Textarea, AutoTextarea }");
}

fs.writeFileSync(path, content);
console.log('CourseBuilder.tsx updated successfully with clean styles and AutoTextarea.');
