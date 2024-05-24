import { doFetch } from "../components/fetch.mjs";

const runPage = async () => {
    const id = window.location.search.slice(1);
    const blog = await doFetch("GET", "https://v2.api.noroff.dev/blog/posts/" + id);

    const form = document.getElementById("editForm");
    const title = document.getElementById("title");
    title.defaultValue = blog.title;

    form.addEventListener("submit", async() => {
        const formData = new FormData(form);
        const postData = {
            title: formData.get("title"),
            body: formData.get("content"),
            media: {
                url: formData.get("post-image-url"),
                alt: "image of blog post: " + formData.get("title")
            }
        };

        await doFetch("PUT", "https://v2.api.noroff.dev/blog/posts/" + id, postData);
    });
}

runPage();