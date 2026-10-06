async function runSecurityTests() {
  console.log('=== TEST 1: KIỂM TRA HTTP SECURITY HEADERS ===')
  try {
    const res = await fetch('http://localhost:3005/')
    console.log('[+] Status:', res.status)
    console.log('[+] x-content-type-options:', res.headers.get('x-content-type-options'))
    console.log('[+] x-frame-options:', res.headers.get('x-frame-options'))
    console.log('[+] x-xss-protection:', res.headers.get('x-xss-protection'))
    console.log('[+] referrer-policy:', res.headers.get('referrer-policy'))
    console.log('[+] permissions-policy:', res.headers.get('permissions-policy'))
    console.log('[+] strict-transport-security:', res.headers.get('strict-transport-security'))
  } catch (err) {
    console.error('Test 1 error:', err)
  }

  console.log('\n=== TEST 2: KIỂM TRA BẪY BOT SPAM (HONEYPOT) ===')
  try {
    const res = await fetch('http://localhost:3005/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Auto Bot Spammer',
        phone: '0901234567',
        website_url: 'http://malicious-spam-site.com',
        message: 'Spam attack payload',
      }),
    })
    const data = await res.json()
    console.log('[+] HTTP Status:', res.status)
    console.log('[+] Payload phản hồi:', JSON.stringify(data))
    if (data.ticketNumber === 'HS-BOT-BLOCKED') {
      console.log('=> KẾT QUẢ: Đã vô hiệu hóa thành công Bot spam mà không lưu rác vào CSDL!')
    }
  } catch (err) {
    console.error('Test 2 error:', err)
  }

  console.log('\n=== TEST 3: KIỂM TRA XÁC THỰC SỐ ĐIỆN THOẠI (VALIDATION) ===')
  try {
    const res = await fetch('http://localhost:3005/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Khách hàng',
        phone: '12345abc',
        message: 'Tôi muốn tư vấn',
      }),
    })
    const data = await res.json()
    console.log('[+] HTTP Status:', res.status)
    console.log('[+] Thông báo từ chối:', JSON.stringify(data))
  } catch (err) {
    console.error('Test 3 error:', err)
  }

  console.log('\n=== TEST 4: KIỂM TRA CHẶN FILE NGUY HIỂM (.exe) ===')
  try {
    const formData = new FormData()
    formData.append('fullName', 'Người dùng test upload')
    formData.append('phone', '0912345678')
    formData.append('file', new Blob(['fake executable code'], { type: 'application/octet-stream' }), 'trojan_malware.exe')

    const res = await fetch('http://localhost:3005/api/inquiries', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    console.log('[+] HTTP Status:', res.status)
    console.log('[+] Thông báo từ chối file:', JSON.stringify(data))
  } catch (err) {
    console.error('Test 4 error:', err)
  }

  console.log('\n=== TEST 5: KIỂM TRA RATE LIMITING (GỬI DỒN DẬP NHIỀU REQUEST) ===')
  try {
    for (let i = 1; i <= 7; i++) {
      const res = await fetch('http://localhost:3005/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `Stress Test ${i}`,
          phone: '0909123456',
          message: `Request số ${i}`,
        }),
      })
      const data = await res.json()
      console.log(`[+] Lần gửi ${i}: Status = ${res.status} | Data:`, data.error ? data.error : `Ticket: ${data.ticketNumber}`)
    }
  } catch (err) {
    console.error('Test 5 error:', err)
  }
}

runSecurityTests().catch(console.error)
