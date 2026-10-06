import pg from 'pg'
const { Client } = pg

const client = new Client({ connectionString: 'postgresql://postgres:mhd_cms_password_2026@localhost:5434/mhd_payload' })

async function sync() {
  await client.connect()
  await client.query(`
    UPDATE site_settings
    SET 
      zalo_number = '3920702626611603828'
    WHERE id = 1
  `)
  await client.query(`
    UPDATE site_settings_locales
    SET 
      zalo_title = 'Zalo Oauth'
    WHERE _locale = 'vi'
  `)
  const check = await client.query('SELECT _locale, zalo_title FROM site_settings_locales')
  console.log('locales:', check.rows)
  const main = await client.query('SELECT id, zalo_number FROM site_settings')
  console.log('main:', main.rows)
  await client.end()
}

sync().catch(console.error)
