export const doFetch = async (method, noroffapi, body) => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(localStorage.getItem('userInfo'));
    let token = "";
    if (userInfo) {
        token = userInfo.accessToken;
    }
    try {
        const response = await fetch(noroffapi, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: 'bearer ' + token
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error("An error occurred");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during fetch:', error);
        throw error;
    }
};