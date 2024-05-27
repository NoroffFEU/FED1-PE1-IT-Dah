import { doFetch } from "../components/fetch.mjs";
import { isSignedIn } from "../components/isSignedIn.mjs";

const checkSignedIn = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return !!userInfo;
};

async function fetchPost() {
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("blogId");

  if (!blogId) {
    return;
  }

  try {
    const response = await doFetch(
      "GET",
      `https://v2.api.noroff.dev/blog/posts/ItDah`
    );

    if (!response || !response.data || response.data.length === 0) {
      displayError("Post not found");
      return;
    }

    const post = response.data.find((p) => p.id === blogId);

    if (!post) {
      displayError("Post not found");
      return;
    }

    displayPost(post);
  } catch (error) {
    displayError("Failed to fetch the blog post. Please try again later.");
  }
}

function displayPost(post) {
  const postContainer = document.getElementById("post-container");

  if (!post) {
    postContainer.innerHTML = "<p>Post not found</p>";
    return;
  }

  const userSignedIn = checkSignedIn();

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
}

function displayError(message) {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = `<p>${message}</p>`;
}

fetchPost();
