import axios from "axios";
// import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};


const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    console.log("loginservice: ",response.data)
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  
  console.log('logout')
  const response = await axios.get(`${base_url}user/logout`);
  console.log("res: ",response)
  if(response) {
    await localStorage.clear();
  }


  return response.data || null;
}

const editUser = async (user) => {
  // const userLogin = JSON.parse(localStorage.getItem("user"));

  // // console.log("before: ",userLogin)
  // if (!userLogin) {
  //   // Handle the case where the token is missing
  //   console.log("Token is missing");
  //   return null;
  // }
  // console.log("editToken: ",userLogin.token)
  // const config = {
  //   headers: {
  //     "Authorization": 'Bearer ' + userLogin.token
  //   }
  // }
  const response = await axios.put(`${base_url}user/edit-user`, user, config);
  console.log("response edit: ", response.data);
  if (response.data) {

    // console.log("data edit: ",response.data)
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
  console.log("data:",data.password)
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`,{password:data.password});
 
  return response.data;
}


const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getaOrder/${id}`,
    config
  );

  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateOrder/${data.id}`,{status:data.status},
    config
  );

  return response.data;
};

const updateOrderStatus = async (data) => {
  const response = await axios.put(
    `${base_url}user/order/update-order/${data.id}`,{status:data.value}, 
    config
  );

  return response.data;
};

const getMonthlyOrders = async () => {
  
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`, 
    config
  );

  return response.data;
};

const getYearlyStats = async () => {
  console.log("configgg3",config)
  const response = await axios.get(
    `${base_url}user/getyearlyorders`, 
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
  updateOrderStatus,
  getYearlyStats,
  getMonthlyOrders,
  updateOrder
};

export default authService;
