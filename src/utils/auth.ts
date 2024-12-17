// utils/auth.js

export async function login(email: string, password: string) {
    const response = await fetch('https://backend-pandorai-960512295965.europe-west6.run.app/auth/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();
    return data;
  }
  