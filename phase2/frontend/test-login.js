
// Native fetch in Node 21+
async function testLogin() {
    const url = 'http://localhost:3002/api/auth/sign-in/email';
    const body = {
        email: 'test@example.com',
        password: 'password123'
    };

    console.log(`Testing login at ${url}...`);

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
            console.log('Session Token:', data?.user?.id ? 'Present' : 'Missing');
        } else {
            console.error('Login failed.');
            console.error('Response:', data);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

testLogin();
