const fs = require('fs');
const path = 'e:\\Tutormee\\Tutor\\tutorme-app\\src\\app\\[locale]\\tutor\\dashboard\\components\\CourseBuilder.tsx';
let content = fs.readFileSync(path, 'utf8');

const TABS_LIST_STYLE = 'neon-border-inner p-1 rounded-xl shadow-lg bg-white/50 backdrop-blur-sm';
const DIALOG_CONTENT_STYLE = 'neon-border-indigo border-none shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl';

// 1. Update TabsList styling
// Look for TabsList that don't already have the new style
content = content.replace(/<TabsList className="grid w-full grid-cols-[^"]*"/g, (match) => {
    if (match.includes('neon-border-inner')) return match;
    return match.replace('className="', `className="${TABS_LIST_STYLE} `);
});

// 2. Update DialogContent in all Modals
content = content.replace(/<DialogContent className="max-w-[^"]*"/g, (match) => {
    if (match.includes('neon-border-indigo')) return match;
    return match.replace('className="', `className="${DIALOG_CONTENT_STYLE} `);
});

// 3. Update main builder Card
content = content.replace(
    /<Card className="flex-shrink-0">/g,
    '<Card className="flex-shrink-0 neon-border-indigo shadow-2xl border-none">'
);

// 4. Update DMI Panel container
content = content.replace(
    /className="p-3 bg-slate-50 rounded-lg min-h-\[150px\]"/g,
    'className="p-4 bg-white/60 backdrop-blur-sm rounded-xl neon-border-inner min-h-[150px] shadow-sm"'
);

// 5. Replace more Textareas with AutoTextarea
// Specifically for instructions, descriptions, and question content
content = content.replace(/<Textarea\s+value={(data|q|assessment|item)\.(description|instructions|question|explanation|answerKey|pci|body)}/g, '<AutoTextarea value={$1.$2}');

// 6. Refine TabsContent consistency (add rounded corners and subtle bg to builder tabs)
content = content.replace(
    /<TabsContent value="(task|assessment)" className="space-y-4">/g,
    '<TabsContent value="$1" className="space-y-4 p-4 border border-dashed rounded-xl bg-slate-50/50 mt-4">'
);

fs.writeFileSync(path, content);
console.log('CourseBuilder.tsx styled successfully.');
