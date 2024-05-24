export const isSignedIn = () => {
    
    function toggleSignInState() {
      const isFrontPage = !(
        window.location.pathname.includes("post") ||
        window.location.pathname.includes("account")
      );
      const signedOutHeader = document.getElementById('signedOutHeader');
      const signedInHeader = document.getElementById('signedInHeader');
      const signOutButton = document.getElementById('sign-out-button');
      signOutButton.addEventListener('click', () => {
        localStorage.removeItem('userInfo');
        if (isFrontPage){ 
          window.location.href = 'index.html';
        } 
        else {
          window.location.href = '../index.html';
        }
      });

  const isSignedIn = JSON.parse(localStorage.getItem('userInfo'));
      
  
  if (isSignedIn) {
        signedOutHeader.style.display = 'none';
        signedInHeader.style.display = 'flex';
        signOutButton.style.display = 'block';
      } else {
        signedOutHeader.style.display = 'flex';
        signedInHeader.style.display = 'none';
        signOutButton.style.display = 'none';
      }
    }
  
    // Check if user information is available in localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
    // Toggle header based on user sign-in status
    if (userInfo && userInfo.token) {
      toggleSignInState(true);
    } else {
      toggleSignInState(false);
    }
  };
  
  // Example usage of isSignedIn
  isSignedIn();
  