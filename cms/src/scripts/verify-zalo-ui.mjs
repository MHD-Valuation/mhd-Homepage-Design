async function check() {
  const res = await fetch('http://localhost:3005/?locale=vi')
  const html = await res.text()
  
  // Cut around Zalo button
  const start = html.indexOf('Zalo Oauth')
  if (start !== -1) {
    console.log('Snippet around Zalo Oauth:')
    console.log(html.substring(start - 100, start + 250))
  } else {
    console.log('Zalo Oauth not found!')
  }
}

check()
