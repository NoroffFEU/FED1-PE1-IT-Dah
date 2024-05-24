import { doFetch } from "../components/fetch.mjs";

// Function to create a single blog post slide for the carousel
function createBlogPostSlide(post) {
  console.log("Creating slide for post:", post); // Log post data for debugging
  const slide = document.createElement("li");
  slide.className = "slides";
  slide.id = `card-${post.color || "default"}`; // Use a default value if color is missing
  slide.innerHTML = `
        <h1>${post.title || "No Title"}</h1>

        <p>${post.author.name || "Unknown Author"} - ${
    post.published_at
      ? new Date(post.published_at).toLocaleDateString()
      : "Unknown Date"
  }</p>

        <img src="${post.media.url || "../images/fallback-image.png"}" alt="${
    post.title || "No Title"
  }" onerror="this.onerror=null;this.src='../images/fallback-image.png';" />

        <p class="body">${post.body || "No text available"}</p>
    `;
  return slide;
}

// Function to create a single blog post card for the feed
function createBlogPostCard(post) {
  console.log("Creating card for post:", post); // Log post data for debugging
  const card = document.createElement("div");
  card.className = "blog-post";
  card.id = `minicard-${post.color || "default"}`; // Use a default value if color is missing
  card.innerHTML = `
        <div class="thumbnail"><img src="${
          post.media.url || "../images/fallback-image.png"
        }" alt="${
    post.title || "No Title"
  }" onerror="this.onerror=null;this.src='../images/fallback-image.png';"></div>
        
        <div class="post-info">
            <h3>${post.title || "No Title"}</h3>
            <p>${post.body || "No text available"}</p>
        </div>
    `;
  return card;
}

// Function to check if the response is valid
function isValidResponse(response) {
  return response && Array.isArray(response.data);
}

// Function to fetch and display blog posts
async function fetchBlogPosts() {
  try {
    const response = await doFetch(
      "GET",
      "https://v2.api.noroff.dev/blog/posts/ItDah"
    );
    console.log("Full API Response", response);

    if (isValidResponse(response)) {
      const slidesContainer = document.querySelector("[data-slides]");
      const feedContainer = document.querySelector(".blog-feed");

      slidesContainer.innerHTML = ""; // Clear any existing slides
      feedContainer.innerHTML = ""; // Clear any existing feed posts

      // Sort blog posts by published date in descending order
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.published_at) - new Date(a.published_at)
      );

      // Get the latest three blog posts for the carousel
      const latestPosts = sortedPosts.slice(0, 3);

      latestPosts.forEach((post, index) => {
        const slide = createBlogPostSlide(post);
        if (index === 0) {
          slide.dataset.active = true; // Set the first slide as active
        }
        slidesContainer.appendChild(slide);
      });

      // Add all posts to the feed
      sortedPosts.forEach((post) => {
        const card = createBlogPostCard(post);
        feedContainer.appendChild(card);
      });
    } else {
      console.error("Invalid response data format");
    }
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
  }
}

// Carousel button functionality
const buttons = document.querySelectorAll("[data-carousel-button]");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

// Fetch and display blog posts on page load
fetchBlogPosts();
