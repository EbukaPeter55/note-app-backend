import fs from 'fs'
import path from 'path'
import { pool } from '../config/database'

async function runMigrations() {
  const migrationsPath = path.join(__dirname, 'migrations')

  const files = fs
    .readdirSync(migrationsPath)
    .filter((file) => file.endsWith('.sql'))
    .sort()

  for (const file of files) {
    const filePath = path.join(migrationsPath, file)
    const sql = fs.readFileSync(filePath, 'utf8')

    console.log(`Running migration: ${file}`)

    await pool.query(sql)
  }

  console.log('Migrations completed')
  process.exit(0)
}

runMigrations().catch((err) => {
  console.error('Migration error:', err)
  process.exit(1)
})