export const doFetch = async (method, url, body = null) => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(localStorage.getItem("userInfo"));
  let token = "";
  if (userInfo) {
    token = userInfo.accessToken;
  }
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error("An error occurred: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    throw error;
  }
};
