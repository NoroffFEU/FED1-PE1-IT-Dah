import { doFetch } from "../components/fetch.mjs";

const runPage = async () => {
  const id = window.location.search.slice(1); // Extracting id from query string
  const blog = await doFetch(
    "GET",
    `https://v2.api.noroff.dev/blog/posts/ItDah${id}`
  );

  const form = document.getElementById("editForm");
  const title = document.getElementById("title");
  title.defaultValue = blog.title;

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);
    const postData = {
      title: formData.get("title"),
      body: formData.get("content"),
      media: {
        url: formData.get("post-image-url"),
        alt: `image of blog post: ${formData.get("title")}`,
      },
    };

    await doFetch(
      "PUT",
      `https://v2.api.noroff.dev/blog/posts/ItDah${id}`,
      postData
    );
  });
};

runPage();
