
async function testDeployedLogin() {
    const url = 'https://hackathon-ii-claude-code-spec-drive.vercel.app/api/auth/sign-in/email';
    const body = {
        email: 'test@example.com',
        password: 'password123'
    };

    console.log(`Testing deployed login at ${url}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json().catch(() => ({}));

        console.log(`Status Code: ${response.status}`);
        if (response.ok) {
            console.log('Login successful!');
            console.log('Session Token:', data?.token ? 'Present' : (data?.user ? 'User Present' : 'Missing'));
        } else {
            console.error('Login failed.');
            console.error('Response:', data);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

testDeployedLogin();
