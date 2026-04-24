const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  let newContent = content

  // Case sensitive replacements
  newContent = newContent.replace(/curriculum/g, 'course')
  newContent = newContent.replace(/Curriculum/g, 'Course')
  newContent = newContent.replace(/CURRICULUM/g, 'COURSE')

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`Updated ${filePath}`)
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath)
    } else if (fullPath.match(/\.(ts|tsx|js|jsx|json|md)$/)) {
      replaceInFile(fullPath)
    }
  }
}

// 1. Rename files and directories containing 'curriculum'
try {
  const output = execSync('find src -name "*curriculum*" -o -name "*Curriculum*"', {
    cwd: '/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app',
    encoding: 'utf8',
  })
  const paths = output
    .trim()
    .split('\n')
    .filter(Boolean)
    .sort((a, b) => b.length - a.length) // deepest first

  for (const p of paths) {
    const fullPath = path.join('/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app', p)
    if (fs.existsSync(fullPath)) {
      const dir = path.dirname(fullPath)
      const base = path.basename(fullPath)
      const newBase = base.replace(/curriculum/g, 'course').replace(/Curriculum/g, 'Course')
      const newPath = path.join(dir, newBase)
      fs.renameSync(fullPath, newPath)
      console.log(`Renamed ${fullPath} to ${newPath}`)
    }
  }
} catch (e) {
  console.log('No files to rename or error:', e.message)
}

// 2. Walk and replace contents
walkDir('/Users/nazy/ADK_WORKSPACE/TutorMekimi/tutorme-app/src')
console.log('Global replace complete.')
