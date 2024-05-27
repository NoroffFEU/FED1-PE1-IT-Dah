import { doFetch } from "../components/fetch.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".register-form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const postdata = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    };

    const data = await doFetch(
      "POST",
      "https://v2.api.noroff.dev/auth/register",
      postdata
    );

    window.location.href = "./login.html";
  });
});
