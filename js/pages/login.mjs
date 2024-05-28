import { doFetch } from "../components/fetch.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const postdata = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const data = await doFetch(
      "POST",
      "https://v2.api.noroff.dev/auth/login",
      postdata
    );

    localStorage.setItem("userInfo", JSON.stringify(data.data));

    window.location.href = "../index.html";
  });
});
