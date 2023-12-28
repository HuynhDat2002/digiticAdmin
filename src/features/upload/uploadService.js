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

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data, config);
  return response.data;
};
const deleteImg = async (id) => {
  const splitId = id.split('/');
  const idImg = splitId[splitId.length-1]
  console.log("id: ",id);
  const response = await axios.delete(
    `${base_url}upload/delete-img/${idImg}`,

    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
