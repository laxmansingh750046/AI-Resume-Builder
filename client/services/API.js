import axios from "axios";
import { Clerk } from "@clerk/clerk-js";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api",
  withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await Clerk.session?.getToken(); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);
const GetUserResumes = (email) => axiosClient.get('/user-resumes', { params: { email } });
const GetResumeById = (id) => axiosClient.get(`/user-resumes/${id}`);
const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data);
const DeleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`);

export default {
  CreateNewResume,
  GetUserResumes,
  GetResumeById,
  UpdateResumeDetail,
  DeleteResumeById,
};
