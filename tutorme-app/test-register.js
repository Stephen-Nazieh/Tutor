async function run() {
  const res = await fetch("https://tutorme-app-267976186000.asia-southeast1.run.app/api/auth/register/student", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test.fail@example.com",
      password: "password123",
      name: "Test Failure",
      tosAccepted: true,
      profileData: {}
    })
  });
  console.log("Status:", res.status);
  try {
    const text = await res.text();
    console.log("Body:", text);
  } catch (e) {
    console.log("Error reading body", e);
  }
}
run();
