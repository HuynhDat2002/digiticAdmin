import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  
  console.log('logout')
  await localStorage.removeItem("user");
  const response = await axios.get(`${base_url}user/logout`);
  if(response) {
    await localStorage.clearItem();
  }


  return response.data;
}

const editUser = async (user) => {
  const userLogin = JSON.parse(localStorage.getItem("user"));

  // console.log("before: ",userLogin)
  if (!userLogin) {
    // Handle the case where the token is missing
    console.error("Token is missing");
    return null;
  }
  const config = {
    headers: {
      "Authorization": 'Bearer ' + userLogin.token
    }
  }
  const response = await axios.put(`${base_url}user/edit-user`, user, config);
  console.log("response edit: ", response.data);
  if (response.data) {

    // console.log("data edit: ",response.data)
    await localStorage.removeItem("user")
    await localStorage.setItem("user", JSON.stringify(response.data));
  }
  const usera = JSON.parse(localStorage.getItem("user"))
  console.log("userEdit after: ", usera)
  return response.data;
}

const forgotPassword = async (email) => {
  const response = await axios.post(`${base_url}user/forgot-password-token`,email);
  if (response.data) {
    localStorage.setItem("tokenPassword", response.data);
    const tokenPassword= localStorage.getItem("tokenPassword");
    console.log("tokenPassword: ",tokenPassword)
  }
  console.log('forgot password: ',response);
  return response.data;
}

const resetPassword = async (data) => {
  console.log('a')
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`,data.password);
  console.log(response.data);
  if (response.data) {
    localStorage.clearItem("tokenPassword");
  }
  return response.data;
}


const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {

  login,
  logout,
  editUser,
  forgotPassword,
  resetPassword,
  getOrders,
  getOrder,
};

export default authService;
