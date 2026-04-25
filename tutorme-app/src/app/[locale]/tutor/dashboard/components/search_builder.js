const fs = require('fs')
const filePath =
  'e:\\Tutormee\\Tutor\\tutorme-app\\src\\app\\[locale]\\tutor\\dashboard\\components\\CourseBuilder.tsx'
const content = fs.readFileSync(filePath, 'utf8')
const lines = content.split(/\r?\n/)

console.log('Searching for patterns in CourseBuilder.tsx...')

const patterns = [/<TabsList/g, /<TabsContent/g, /className="grid/g, /<AutoTextarea/g]

patterns.forEach(pattern => {
  console.log(`Results for ${pattern}:`)
  lines.forEach((line, index) => {
    if (pattern.test(line)) {
      console.log(`${index + 1}: ${line.trim()}`)
    }
  })
})
