import { doFetch } from '../components/fetch.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form form');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
      const data = await doFetch('POST', 'https://v2.api.noroff.dev/auth/login', { email, password });

      const token = data.token;

      // Store user information in local storage
      localStorage.setItem('userInfo', JSON.stringify({ token }));

      // Redirect to the create-post page
      window.location.href = '/post/create-post.html';
    } catch (error) {
      console.error('Error:', error.message);
      // Display an error message to the user
      document.querySelector('#error-message').innerText = 'Login failed. Please try again.';
    }
  });

  // Function to toggle sign-in state
  function toggleSignInState(isSignedIn) {
    const signedOutHeader = document.getElementById('signedOutHeader');
    const signedInHeader = document.getElementById('signedInHeader');

    if (isSignedIn) {
      signedOutHeader.style.display = 'none';
      signedInHeader.style.display = 'flex';
    } else {
      signedOutHeader.style.display = 'flex';
      signedInHeader.style.display = 'none';
    }
  }

  // Example usage of toggleSignInState
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    toggleSignInState(true);
  } else {
    toggleSignInState(false);
  }
});