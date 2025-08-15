import axios from "axios";

const axiosClient = (getToken) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api",
    withCredentials: true,
  });

  instance.interceptors.request.use(async (config) => {
    if (typeof getToken  === "function") {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  return instance;
};


const CreateNewResume = async(data,getToken) => await axiosClient(getToken).post('/user-resumes', data);
const GetUserResumes = async(getToken) => await axiosClient(getToken).get('/user-resumes');
const GetResumeById = async(id,getToken) => await axiosClient(getToken).get(`/user-resumes/${id}`);
const UpdateResumeDetail = async(id, data,getToken) => await axiosClient(getToken).put(`/user-resumes/${id}`, data);
const DeleteResumeById = async(id,getToken) => await axiosClient(getToken).delete(`/user-resumes/${id}`);
const AIChatSession = async(prompt) => {
    const resp = await axiosClient().post('/ai/generate', {prompt});
     return resp.data.text;
}

export default {
  CreateNewResume,
  GetUserResumes,
  GetResumeById,
  UpdateResumeDetail,
  DeleteResumeById,
  AIChatSession
};
