const fs = require('fs');
const path = 'e:\\Tutormee\\Tutor\\tutorme-app\\src\\app\\[locale]\\tutor\\dashboard\\components\\CourseBuilder.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix Duplication in TabsList
// The previous script might have appended the same classes multiple times.
content = content.replace(/className="grid w-full grid-cols-2 mb-6 (neon-border-inner p-1 rounded-xl shadow-lg bg-white\/50 backdrop-blur-sm\s*)+"/g, (match) => {
    return 'className="grid w-full grid-cols-2 mb-6 neon-border-inner p-1 rounded-xl shadow-lg bg-white/50 backdrop-blur-sm"';
});

// 2. Ensure AutoTextarea is imported
if (!content.includes('import { AutoTextarea }')) {
    if (content.includes('import { Textarea }')) {
        content = content.replace('import { Textarea }', 'import { Textarea, AutoTextarea }');
    } else if (content.includes('import { Textarea,')) {
         content = content.replace('import { Textarea,', 'import { Textarea, AutoTextarea,');
    }
}

// 3. Style the DMI Panel container if it's basic
// Pattern: <div className="p-3 bg-slate-50 rounded-lg min-h-[120px]">
content = content.replace(
    /className="p-3 bg-slate-50 rounded-lg min-h-\[120px\]"/g,
    'className="p-4 bg-white/60 backdrop-blur-sm rounded-xl neon-border-inner min-h-[120px] shadow-sm"'
);

// 4. Style other DMI patterns
content = content.replace(
    /className="p-3 bg-slate-50 rounded-lg min-h-\[150px\]"/g,
    'className="p-4 bg-white/60 backdrop-blur-sm rounded-xl neon-border-inner min-h-[150px] shadow-sm"'
);

// 5. Ensure AIAssistAgent and QuestionBankModal have max-h-[90vh] and consistent rounded/neon
content = content.replace(
    /DialogContent className="max-w-4xl h-\[600px\] flex flex-col neon-border-indigo/g,
    'DialogContent className="max-w-4xl h-[90vh] flex flex-col neon-border-indigo border-none shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl'
);

// 6. Replace more Textareas with AutoTextarea for better UX
// Especially in the main builder and modals for instructions/descriptions
content = content.replace(/<Textarea\s+value={(data|q|assessment|item)\.(description|instructions|question|explanation|answerKey|pci|body)}/g, '<AutoTextarea value={$1.$2}');

fs.writeFileSync(path, content);
console.log('CourseBuilder.tsx refined successfully.');
