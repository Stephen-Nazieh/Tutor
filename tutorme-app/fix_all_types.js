const fs = require('fs');
const files = [
    'e:/Tutormee/Tutor/tutorme-app/src/app/[locale]/tutor/reports/page.tsx',
    'e:/Tutormee/Tutor/tutorme-app/src/app/[locale]/tutor/dashboard/components/UpcomingClassesCard.tsx',
    'e:/Tutormee/Tutor/tutorme-app/src/app/[locale]/tutor/dashboard/components/ModernHeroSection.tsx',
    'e:/Tutormee/Tutor/tutorme-app/src/app/[locale]/tutor/dashboard/components/InteractiveCalendar.tsx',
    'e:/Tutormee/Tutor/tutorme-app/src/app/[locale]/tutor/courses/page.tsx',
    'e:/Tutormee/Tutor/tutorme-app/src/app/[locale]/tutor/dashboard/components/CourseBuilder.tsx'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        // Replace (e) => or (event) => with typed versions
        let newContent = content.replace(/\((e|event)\)\s*=>/g, '($1: any) =>');
        if (content !== newContent) {
            fs.writeFileSync(f, newContent);
            console.log('Fixed types in:', f);
        }
    }
});
