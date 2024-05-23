import { doFetch } from '../components/fetch.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form form');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

const formData = new FormData(loginForm);
    const postdata = { 
      email: formData.get('email'),
      password: formData.get('password')
    };
    
      const data = await doFetch('POST', 'https://v2.api.noroff.dev/auth/login', postdata );
console.log(data);

      // Store user information in local storage
      localStorage.setItem('userInfo', JSON.stringify(data.data));

      // Redirect to the create-post page
      window.location.href = '/index.html';
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