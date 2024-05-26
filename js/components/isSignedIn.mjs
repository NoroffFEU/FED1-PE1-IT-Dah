export const isSignedIn = () => {
  function toggleSignInState(isSignedIn) {
    const signedOutHeader = document.getElementById("signedOutHeader");
    const signedInHeader = document.getElementById("signedInHeader");
    const signOutButtonContainer = document.getElementById(
      "sign-out-button-container"
    );

    signOutButtonContainer.addEventListener("click", () => {
      localStorage.removeItem("userInfo");
      window.location.href =
        window.location.pathname.includes("post") ||
        window.location.pathname.includes("account")
          ? "../index.html"
          : "index.html";
    });

    if (isSignedIn) {
      signedOutHeader.style.display = "none";
      signedInHeader.style.display = "flex";
    } else {
      signedOutHeader.style.display = "flex";
      signedInHeader.style.display = "none";
    }
  }

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  toggleSignInState(!!userInfo);
};

isSignedIn();
