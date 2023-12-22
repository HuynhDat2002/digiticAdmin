import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`,config);

  return response.data;
};

const getProduct= async (id) => {
  const response = await axios.get(`${base_url}product/${id}`,config);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/create`, product, config);

  return response.data;
};
const updateProduct = async (product,id) => {
  console.log("prod: ",product)
  console.log("idupdate: ",id);
  const response = await axios.put(`${base_url}product/${id}`, product, config);
  return response.data;
};
const deleteProduct = async (id)=>{
  console.log("id: ",id)
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;

}
const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct
};

export default productService;
