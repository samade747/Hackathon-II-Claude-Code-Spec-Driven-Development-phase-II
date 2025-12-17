
const urls = [
    'https://hackathon-ii-claude-code-spec-drive.vercel.app/api/auth/sign-up/email',
    'http://localhost:3002/api/auth/sign-up/email'
];

async function test(url) {
    console.log(`\nTesting against: ${url}`);

    // Case 1: Existing User
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            })
        });
        console.log(`[Existing User] Status: ${res.status}`);
        if (!res.ok) console.log(`Response: ${await res.text()}`);
    } catch (e) { console.log("Fetch error:", e.message); }

    // Case 2: Missing Name
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'missingname@example.com',
                password: 'password123'
            })
        });
        console.log(`[Missing Name] Status: ${res.status}`);
        if (!res.ok) console.log(`Response: ${await res.text()}`);
    } catch (e) { console.log("Fetch error:", e.message); }

    // Case 3: Invalid Email
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'not-an-email',
                password: 'password123',
                name: 'Bad Email'
            })
        });
        console.log(`[Invalid Email] Status: ${res.status}`);
        if (!res.ok) console.log(`Response: ${await res.text()}`);
    } catch (e) { console.log("Fetch error:", e.message); }
}

async function run() {
    await test(urls[0]); // Deployed
    // await test(urls[1]); // Local (optional, if deployed fails to connect)
}

run();
