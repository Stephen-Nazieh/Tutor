const fs = require('fs');

const logPath = './ts_errors.log';
const log = fs.readFileSync(logPath, 'utf8');

const errors = log.split('\n').filter(line => line.includes('error TS'));
const fileMap = new Map();

errors.forEach(err => {
    const match = err.match(/^(.+?)\((\d+),(\d+)\): error (TS\d+): (.*)$/);
    if (match) {
        const [, file, line, col, tsCode, msg] = match;
        if (!fileMap.has(file)) {
            fileMap.set(file, { count: 0, codes: {} });
        }
        const fileStats = fileMap.get(file);
        fileStats.count++;
        fileStats.codes[tsCode] = (fileStats.codes[tsCode] || 0) + 1;
    }
});

const sorted = [...fileMap.entries()].sort((a, b) => b[1].count - a[1].count);

console.log("Top 15 files with most TS errors:");
sorted.slice(0, 15).forEach(([file, stats]) => {
    console.log(`${stats.count} errors in ${file}`);
    console.log(`  Breakdown: ${JSON.stringify(stats.codes)}`);
});
