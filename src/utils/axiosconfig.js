const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

export const config3 =(auth)=> {
  return{

    headers: {
      Authorization: `Bearer ${
        auth !== null ? auth?.token : ""
      }`,
      Accept: "application/json",
    },
  }
};