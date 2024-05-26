import { doFetch } from "../components/fetch.mjs";

const colors = ["#574075", "#953775", "#ffdc98", "#d59f77"];

function createBlogPostSlide(post, color) {
  const slide = document.createElement("li");
  slide.className = "slides";
  slide.style.backgroundColor = color;
  slide.id = `card-${post.color || "default"}`;
  slide.innerHTML = `
    <h1>${post.title || "No Title"}</h1>
    <p>${post.author.name || "Unknown Author"} - ${
    post.created ? new Date(post.created).toLocaleDateString() : "Unknown Date"
  }</p>
    <img src="${post.media.url || "../images/fallback-image.png"}" alt="${
    post.title || "No Title"
  }" onerror="this.onerror=null;this.src='../images/fallback-image.png';" />
    <p class="body">${post.body || "No text available"}</p>
  `;

  slide.addEventListener("click", () => {
    window.location.href = `/post/index.html?blogId=${post.id}`;
  });

  return slide;
}

function createBlogPostCard(post, color) {
  const card = document.createElement("div");
  card.className = "blog-post";
  card.style.backgroundColor = color;
  card.id = `minicard-${post.id}`;
  card.innerHTML = `
    <div class="thumbnail">
      <img src="${post.media.url || "../images/fallback-image.png"}" alt="${
    post.title || "No Title"
  }" onerror="this.onerror=null;this.src='../images/fallback-image.png';">
    </div>
    <div class="post-info">
      <h3>${post.title || "No Title"}</h3>
      <p>${post.author.name || "Unknown Author"} - ${
    post.created ? new Date(post.created).toLocaleDateString() : "Unknown Date"
  }</p>
    </div>
  `;

  card.addEventListener("click", () => {
    window.location.href = `/post/index.html?blogId=${post.id}`;
  });

  return card;
}

function isValidResponse(response) {
  return response && Array.isArray(response.data);
}

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

      slidesContainer.innerHTML = "";
      feedContainer.innerHTML = "";

      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.published_at) - new Date(a.published_at)
      );

      const latestPosts = sortedPosts.slice(0, 3);

      latestPosts.forEach((post, index) => {
        const slide = createBlogPostSlide(post, colors[index % colors.length]);
        if (index === 0) {
          slide.dataset.active = true;
        }
        slidesContainer.appendChild(slide);
      });

      const latestFeedPosts = sortedPosts.slice(0, 12);

      latestFeedPosts.forEach((post, index) => {
        const card = createBlogPostCard(post, colors[index % colors.length]);
        feedContainer.appendChild(card);
      });
    } else {
      console.error("Invalid response data format");
    }
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
  }
}

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

fetchBlogPosts();
