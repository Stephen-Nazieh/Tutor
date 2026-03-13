const fs = require('fs');
const path = 'e:\\Tutormee\\Tutor\\tutorme-app\\src\\app\\[locale]\\tutor\\dashboard\\components\\CourseBuilder.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix implicitly any 'e' in event handlers
// Case 1: (e) =>
content = content.replace(/\((e|event)\)\s*=>/g, '($1: any) =>');

fs.writeFileSync(path, content);
console.log('CourseBuilder.tsx typed successfully.');
