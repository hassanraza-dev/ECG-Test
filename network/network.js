import axiosInstance from "./config";

export const fetchAllBooks = async () => {
  const response = await axiosInstance.get("/books");
  return response.data;
};

export const updateBook = async (id, data) => {
  const response = await axiosInstance.patch(`/books/${id}`, data);
  return response.data;
};

export const createBook = async (data) => {
  const response = await axiosInstance.post(`/books`, data);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axiosInstance.delete(`/books/${id}`);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axiosInstance.post(`/user/login`, credentials);
  return response.data;
};

export const signup = async (credentials) => {
  const response = await axiosInstance.post(`/user/signup`, credentials);
  return response.data;
};
