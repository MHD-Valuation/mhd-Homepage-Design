import pg from 'pg'
const { Client } = pg

const client = new Client({ connectionString: 'postgresql://postgres:mhd_cms_password_2026@localhost:5434/mhd_payload' })

async function update() {
  await client.connect()
  const result = await client.query(`
    UPDATE site_settings_locales 
    SET 
      quick_contact_title = 'CONTACT MHD',
      phone_title = 'Call Hotline',
      zalo_title = 'Message Zalo',
      working_hours = '8:00 – 17:30, Monday – Saturday'
    WHERE _locale = 'en'
  `)
  console.log('Updated rows:', result.rowCount)

  const check = await client.query(`SELECT _locale, quick_contact_title, phone_title, zalo_title, working_hours FROM site_settings_locales`)
  console.log('Current records in DB:', check.rows)

  await client.end()
}

update().catch(console.error)
