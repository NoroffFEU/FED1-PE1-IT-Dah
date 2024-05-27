export const doFetch = async (method, url, body = null) => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let token = userInfo ? userInfo.accessToken : "";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const responseText = await response.text();
    return responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    throw error;
  }
};
