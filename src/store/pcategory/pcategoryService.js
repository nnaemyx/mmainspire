import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}product/category/`);

  return response.data;
};
const createCategory = async (category) => {
  const response = await axios.post(`${base_url}product/category/`, category);

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}product/category/${id}`);

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}product/category/${id}`);

  return response.data;
};
const updateProductCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url}product/category/${category.id}`,
    { title: category.pCatData.title },
  );

  return response.data;
};
const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default pCategoryService;
