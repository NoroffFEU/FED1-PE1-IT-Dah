import { doFetch } from "../components/fetch.mjs";

const runPage = () => {
  const form = document.getElementById("uploadForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const postData = {
      title: formData.get("title"),
      body: formData.get("body"),
      name: formData.get("name"),
      media: {
        url: formData.get("post-image-url"),
        alt: "image of blog post: " + formData.get("title"),
      },
    };

    try {
      const response = await doFetch(
        "POST",
        `https://v2.api.noroff.dev/blog/posts/ItDah`,
        postData
      );
      window.alert("Post created successfully");
      window.location.href = "../index.html";
    } catch (error) {
      ("Failed to create post.");
    }
  });
};

runPage();
