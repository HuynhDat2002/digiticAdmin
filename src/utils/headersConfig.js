
export const headersConfig = () => {
    const userLogin = JSON.parse(localStorage.getItem("user"));

    // console.log("before: ",userLogin)
    if (!userLogin) {
        // Handle the case where the token is missing
        console.log("Token is missing");
        return null;
    }
    const config = {
        headers: {
            "Authorization": 'Bearer ' + userLogin.token
        }




    }

    return config



}
