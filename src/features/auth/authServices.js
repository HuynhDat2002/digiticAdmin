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
  const userLogin = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      "Authorization": 'Bearer ' + userLogin.token
    }
  }
  const response = await axios.get(`${base_url}user/logout`, config);
  localStorage.removeItem("user");
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
    localStorage.removeItem("user")
    await localStorage.setItem("user", JSON.stringify(response.data));
   
  }

  const usera = JSON.parse(localStorage.getItem("user"))
  console.log("userEdit after: ", usera)
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
  getOrders,
  getOrder,
};

export default authService;
