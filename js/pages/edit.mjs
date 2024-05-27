import { doFetch } from "../components/fetch.mjs";
import { isSignedIn } from "../components/isSignedIn.mjs";

const runPage = async () => {
  isSignedIn();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("blogId");

  if (!id) {
    return;
  }

  try {
    const url = `https://v2.api.noroff.dev/blog/posts/ItDah`;

    const response = await doFetch("GET", url);

    if (!response || !response.data) {
      return;
    }

    const blogPosts = response.data;

    const blog = blogPosts.find((post) => post.id === id);

    if (blog) {
      document.getElementById("title").value = blog.title || "";
      document.getElementById("body").value = blog.body || "";
      document.getElementById("post-image-url").value = blog.media?.url || "";
    }

    document
      .getElementById("uploadForm")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const postData = {
          title: document.getElementById("title").value,
          body: document.getElementById("body").value,
          media: {
            url: document.getElementById("post-image-url").value,
            alt: `image of blog post: ${
              document.getElementById("title").value
            }`,
          },
        };

        try {
          const updateResponse = await doFetch(
            "PUT",
            `https://v2.api.noroff.dev/blog/posts/ItDah/${id}`,
            postData
          );

          if (updateResponse.data) {
            alert("Post updated successfully");
            window.location.href = "../index.html";
          } else {
            throw new Error(`Failed to update post: ${updateResponse.meta}`);
          }
        } catch (error) {
          alert("Failed to update post");
        }
      });

    document
      .getElementById("button-delete")
      .addEventListener("click", async (event) => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete this post?")) {
          try {
            const deleteResponse = await doFetch(
              "DELETE",
              `https://v2.api.noroff.dev/blog/posts/ItDah/${id}`
            );

            if (deleteResponse) {
              alert("Post deleted successfully");
              window.location.href = "../index.html";
            } else {
              throw new Error(
                `Failed to delete post: ${deleteResponse.status}`
              );
            }
          } catch (error) {
            alert("Failed to delete post");
          }
        }
      });
  } catch (error) {}
};

runPage();
