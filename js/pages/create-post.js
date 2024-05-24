import { doFetch } from "../components/fetch.mjs";

const runPage = () => {
    const form = document.getElementById("uploadForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const postData = {
            title: formData.get("title"),
            body: formData.get("content"),
            date: formData.get("date"),
            name: formData.get("name"),
            media: {
                url: formData.get("post-image-url"),
                alt: "image of blog post: " + formData.get("title")
            }
        };

        try {
            const response = await doFetch("POST", `https://v2.api.noroff.dev/blog/posts/ItDah`, postData);
            console.log('Post created successfully:', response);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    });
};

runPage();