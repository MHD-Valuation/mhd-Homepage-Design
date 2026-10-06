import pg from 'pg'
const { Client } = pg

const client = new Client({ connectionString: 'postgresql://postgres:mhd_cms_password_2026@localhost:5434/mhd_payload' })

async function run() {
  await client.connect()
  const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%site%'")
  console.log('Tables found:', tables.rows)
  
  for (const t of tables.rows) {
    const data = await client.query(`SELECT * FROM "${t.table_name}" LIMIT 5`)
    console.log(`\nTable ${t.table_name}:`, JSON.stringify(data.rows, null, 2))
  }
  await client.end()
}

run().catch(console.error)
