async function test() {
  try {
    const res = await fetch('http://localhost:3003/api/curriculums/149cbd8a-fe3e-48c1-9393-7c160fdb24c5')
    console.log('Status:', res.status)
    const data = await res.text()
    console.log('Response:', data)
  } catch(e) {
    console.log('Error:', e)
  }
}
test()
