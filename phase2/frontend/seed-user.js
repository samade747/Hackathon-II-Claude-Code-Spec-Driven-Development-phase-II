
// Native fetch is available in Node 18+

// Native fetch is available in Node 18+. If older, we might need a library, but let's try native first.
// If that fails, we can use https.

async function seedUser() {
    const url = 'http://localhost:3000/api/auth/sign-up/email';
    const body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
    };

    console.log(`Attempting to sign up user at ${url}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json().catch(() => ({})); // Handle cases where response isn't JSON

        console.log(`Status Code: ${response.status}`);

        if (response.ok) {
            console.log('User created successfully!');
            console.log('Response:', data);
        } else {
            console.error('Failed to create user.');
            console.error('Error Response:', data);
            if (response.status === 400 || response.status === 422) {
                console.log("Tip: User might already exist or data is invalid.");
            }
        }

    } catch (error) {
        console.error('Network error or script failure:', error);
    }
}

seedUser();
