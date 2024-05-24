import { doFetch } from "../components/fetch.mjs";

const runPage = async () => {
    const id = window.location.search.slice(1);
    const blog = await doFetch("GET", "https://v2.api.noroff.dev/blog/posts/" + id);

    const form = document.getElementById("editForm");
    const title = document.getElementById("title");
    const body = document.getElementById("body");
    const name = document.getElementById("name");
    const postImageUrl = document.getElementById("post-image-url");

    // Fyll ut skjemaet med eksisterende bloggdata
    title.defaultValue = blog.title;
    body.defaultValue = blog.body;
    name.defaultValue = blog.name;
    postImageUrl.defaultValue = blog.media.url;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const postData = {
            title: formData.get("title"),
            body: formData.get("body"),
            name: formData.get("name"),
            media: {
                url: formData.get("post-image-url"),
                alt: "image of blog post: " + formData.get("title")
            }
        };

        try {
            const response = await doFetch("PUT", "https://v2.api.noroff.dev/blog/posts/" + id, postData);
            console.log('Post updated successfully:', response);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    });

    // Event listener for slett-knappen
    const deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", async () => {
        const confirmDelete = confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            try {
                const response = await doFetch("DELETE", "https://v2.api.noroff.dev/blog/posts/" + id);
                console.log('Post deleted successfully:', response);
                window.location.href = "/index.html"; // Omdirigerer brukeren til hjemmesiden etter sletting
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    });
};

runPage();