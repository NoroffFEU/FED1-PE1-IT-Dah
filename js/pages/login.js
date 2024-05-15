const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('https://v2.api.noroff.dev/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    const token = data.token;

    localStorage.setItem('token', token);

    window.location.href = '/post/create-post.html';
  } catch (error) {
    console.error('Error:', error.message);
    document.querySelector('#error-message').innerText = 'Login failed. Please try again.';
  }
});

function toggleSignInState(isSignedIn) {
  const signedOutHeader = document.getElementById('signedOutHeader');
  const signedInHeader = document.getElementById('signedInHeader');
  
  if (isSignedIn) {
    signedOutHeader.style.display = 'none';
    signedInHeader.style.display = 'block';
  } else {
    signedOutHeader.style.display = 'block';
    signedInHeader.style.display = 'none';
  }
}
