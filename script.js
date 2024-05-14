export async function fetchData() {
  const url = "https://v2.api.noroff.dev/blog/posts/ItDah";
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXREYWgiLCJlbWFpbCI6Iml0ZGFoQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzE1MzI3MDE5fQ.agYc4LwhL84QeNjebg3_nQEQBIs4YOiHgiwUBU7fIBE';

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer' + key
      },
    });

    if (!response.ok) {
      throw new Error("An error occurred");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}