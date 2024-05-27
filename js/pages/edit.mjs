import { doFetch } from "../components/fetch.mjs";
import { isSignedIn } from "../components/isSignedIn.mjs"; // Ensure the user is signed in

const runPage = async () => {
  isSignedIn(); // Check if the user is signed in

  const params = new URLSearchParams(window.location.search);
  const id = params.get("blogId"); // Extracting blogId from query string

  console.log("Blog ID from URL:", id); // Log the blog ID

  if (!id) {
    console.error("No blog ID found in URL");
    return;
  }

  try {
    const url = `https://v2.api.noroff.dev/blog/posts/ItDah`; // Fetch all posts
    console.log("Fetching blog posts from URL:", url); // Log the URL

    const response = await doFetch("GET", url);
    console.log("Fetch Response:", response); // Log the response

    if (!response || !response.data) {
      console.error("Invalid response format or no data found");
      return;
    }

    const blogPosts = response.data;
    console.log("Fetched Blog Data:", blogPosts); // Log the fetched blog data

    const blog = blogPosts.find((post) => post.id === id);
    console.log("Matched Blog Post:", blog); // Log the matched blog post

    if (blog) {
      // Fill in the form fields with the fetched blog data
      document.getElementById("title").value = blog.title || "";
      document.getElementById("body").value = blog.body || "";
      document.getElementById("post-image-url").value = blog.media?.url || "";
    } else {
      console.error("No blog data found");
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

          console.log("Update Response:", updateResponse); // Log the update response

          if (updateResponse.data) {
            alert("Post updated successfully");
            window.location.href = "../index.html"; // Redirect to index.html
          } else {
            throw new Error(`Failed to update post: ${updateResponse.meta}`);
          }
        } catch (error) {
          console.error("Error updating post:", error);
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

            console.log("Delete Response:", deleteResponse); // Log the delete response

            if (deleteResponse) {
              alert("Post deleted successfully");
              window.location.href = "../index.html"; // Redirect to index.html
            } else {
              throw new Error(
                `Failed to delete post: ${deleteResponse.status}`
              );
            }
          } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post");
          }
        }
      });
  } catch (error) {
    console.error("Failed to fetch the blog post:", error);
  }
};

runPage();
