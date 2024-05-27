import { doFetch } from "../components/fetch.mjs";

const runPage = async () => {
  const id = window.location.search.slice(1); // Extracting id from query string
  const blog = await doFetch("GET", `https://v2.api.noroff.dev/blog/posts/ItDah${id}`);

  const form = document.getElementById("uploadForm");
  const title = document.getElementById("title");
  const body = document.getElementById("body");
  const imageUrl = document.getElementById("post-image-url");

  title.value = blog.title;
  body.value = blog.body;
  imageUrl.value = blog.media.url;

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const postData = {
      title: title.value,
      body: body.value,
      media: {
        url: imageUrl.value,
        alt: `image of blog post: ${title.value}`,
      },
    };

    await doFetch("PUT", `https://v2.api.noroff.dev/blog/posts/ItDah${id}`, postData);
    alert("Post updated successfully");
  });

  const deleteButton = document.getElementById("button-delete");
  deleteButton.addEventListener("click", async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await doFetch("DELETE", `https://v2.api.noroff.dev/blog/posts/ItDah${id}`);
      alert("Post deleted successfully");
      window.location.href = "../index.html"; // Redirect to homepage after deletion
    }
  });
};

runPage();
