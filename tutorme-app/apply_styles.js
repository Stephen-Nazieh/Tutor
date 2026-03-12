const fs = require('fs');
const path = 'e:\\Tutormee\\Tutor\\tutorme-app\\src\\app\\[locale]\\tutor\\dashboard\\components\\CourseBuilder.tsx';
let content = fs.readFileSync(path, 'utf8');

// Use specific strings to avoid global damage
const NEON_MODAL = 'neon-border-indigo border-none shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl';
const NEON_TABS_LIST = 'neon-border-inner p-1 rounded-xl shadow-lg bg-white/50 backdrop-blur-sm';
const NEON_TABS_CONTENT = 'neon-border-indigo shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md p-6 mt-4';
const NEON_GRID_CONTAINER = 'neon-border-inner p-4 rounded-xl bg-white/30 backdrop-blur-sm shadow-sm';

// 1. DialogContent replacements
content = content.replace(/<DialogContent className="max-w-2xl max-h-\[90vh\] overflow-y-auto">/g, `<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto ${NEON_MODAL}">`);
content = content.replace(/<DialogContent className="max-w-3xl max-h-\[90vh\] overflow-y-auto">/g, `<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto ${NEON_MODAL}">`);
content = content.replace(/<DialogContent className="max-w-2xl max-h-\[80vh\] flex flex-col">/g, `<DialogContent className="max-w-2xl max-h-[90vh] flex flex-col ${NEON_MODAL}">`);
content = content.replace(/<DialogContent className="max-w-4xl h-\[600px\] flex flex-col">/g, `<DialogContent className="max-w-4xl h-[90vh] flex flex-col ${NEON_MODAL}">`);
content = content.replace(/<DialogContent className="max-w-md">/g, `<DialogContent className="max-w-md ${NEON_MODAL}">`);
content = content.replace(/<DialogContent className="sm:max-w-md">/g, `<DialogContent className="sm:max-w-md ${NEON_MODAL}">`);
content = content.replace(/<DialogContent className="max-w-2xl max-h-\[80vh\] overflow-y-auto">/g, `<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto ${NEON_MODAL}">`);
content = content.replace(/<DialogContent className="max-w-4xl max-h-\[90vh\] overflow-y-auto">/g, `<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto ${NEON_MODAL}">`);

// 2. TabsList replacements
content = content.replace(/<TabsList className="grid w-full grid-cols-2 mb-4">/g, `<TabsList className="grid w-full grid-cols-2 mb-4 ${NEON_TABS_LIST}">`);
content = content.replace(/<TabsList className="grid w-full grid-cols-2">/g, `<TabsList className="grid w-full grid-cols-2 ${NEON_TABS_LIST}">`);
content = content.replace(/<TabsList className="grid w-full grid-cols-2 mb-2">/g, `<TabsList className="grid w-full grid-cols-2 mb-2 ${NEON_TABS_LIST}">`);
content = content.replace(/<TabsList className="grid w-full grid-cols-3">/g, `<TabsList className="grid w-full grid-cols-3 ${NEON_TABS_LIST}">`);

// 3. TabsContent replacements (Edit/Preview)
content = content.replace(/<TabsContent value="edit" className="space-y-4 py-2">/g, `<TabsContent value="edit" className="space-y-4 py-4 ${NEON_TABS_CONTENT}">`);
content = content.replace(/<TabsContent value="preview" className="space-y-4 py-2">/g, `<TabsContent value="preview" className="space-y-4 py-4 ${NEON_TABS_CONTENT}">`);

// 4. Grid Container replacements
content = content.replace(/className="grid grid-cols-2 gap-4"/g, `className="grid grid-cols-2 gap-4 ${NEON_GRID_CONTAINER}"`);

// 5. Main Card in CourseBuilder
content = content.replace(/<Card className="flex-shrink-0">/g, `<Card className="flex-shrink-0 neon-border-indigo shadow-2xl border-none rounded-2xl overflow-hidden">`);

// 6. Textarea to AutoTextarea
content = content.replace(/<Textarea\s+value={(data|q|assessment|item)\.(description|instructions|question|explanation|answerKey|pci|body)}/g, '<AutoTextarea value={$1.$2}');

// 7. Add AutoTextarea to imports if missing (though it should be there)
if (!content.includes('import { Textarea, AutoTextarea }')) {
    content = content.replace('import { Textarea }', 'import { Textarea, AutoTextarea }');
}

fs.writeFileSync(path, content);
console.log('CourseBuilder.tsx updated with styles and AutoTextarea.');
