import { doFetch } from "../components/fetch.mjs";
import { isSignedIn } from "../components/isSignedIn.mjs"; // Import the isSignedIn function

// Function to check if the user is signed in
const checkSignedIn = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return !!userInfo;
};

async function fetchPost() {
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("blogId");
  console.log("Blog ID from URL:", blogId);

  if (!blogId) {
    console.error("No blog ID found in URL");
    return;
  }

  try {
    console.log("Fetching blog post...");
    const response = await doFetch(
      "GET",
      `https://v2.api.noroff.dev/blog/posts/ItDah`
    );
    console.log("Fetched Post Response:", response);

    if (!response || !response.data || response.data.length === 0) {
      console.error("No data found for the blog post");
      displayError("Post not found");
      return;
    }

    // Find the post with the matching ID
    const post = response.data.find((p) => p.id === blogId);
    console.log("Fetched Post Data:", post);

    if (!post) {
      console.error("No matching post found in the response data");
      displayError("Post not found");
      return;
    }

    displayPost(post);
  } catch (error) {
    console.error("Failed to fetch the blog post:", error);
    displayError("Failed to fetch the blog post. Please try again later.");
  }
}

function displayPost(post) {
  const postContainer = document.getElementById("post-container");
  console.log("Displaying post...");

  if (!post) {
    postContainer.innerHTML = "<p>Post not found</p>";
    return;
  }

  const userSignedIn = checkSignedIn(); // Check if user is signed in

  postContainer.innerHTML = `
    <h1>${post.title || "No Title"}</h1>
    <p>${post.author.name || "Unknown Author"} - ${
    post.created ? new Date(post.created).toLocaleDateString() : "Unknown Date"
  }</p>
    <img src="${post.media?.url || "../images/fallback-image.png"}" alt="${
    post.media?.alt || post.title || "No Title"
  }" onerror="this.onerror=null;this.src='../images/fallback-image.png';" />
    <p>${post.body || "No text available"}</p>
    ${
      userSignedIn
        ? `<button class="edit-post" id="edit-post" type="button">Edit Post</button>`
        : ""
    }
  `;

  if (userSignedIn) {
    document.getElementById("edit-post").addEventListener("click", () => {
      window.location.href = `/post/edit.html?blogId=${post.id}`;
    });
  }

  console.log("Post displayed:", postContainer.innerHTML);
}

function displayError(message) {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = `<p>${message}</p>`;
}

// Fetch and display the post on page load
fetchPost();
