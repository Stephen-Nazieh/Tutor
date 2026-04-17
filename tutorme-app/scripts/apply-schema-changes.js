const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

async function main() {
  const client = new Client({ connectionString: process.env.DIRECT_URL })
  await client.connect()
  const sql = fs.readFileSync(path.join(__dirname, 'apply-schema-changes.sql'), 'utf8')
  await client.query(sql)
  await client.end()
  console.log('Schema changes applied successfully')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
