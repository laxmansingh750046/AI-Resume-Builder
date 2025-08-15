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


const CreateNewResume = (data,getToken) => axiosClient(getToken).post('/user-resumes', data);
const GetUserResumes = (getToken) => axiosClient(getToken).get('/user-resumes');
const GetResumeById = (id,getToken) => axiosClient(getToken).get(`/user-resumes/${id}`);
const UpdateResumeDetail = (id, data,getToken) => axiosClient(getToken).put(`/user-resumes/${id}`, data);
const DeleteResumeById = (id,getToken) => axiosClient(getToken).delete(`/user-resumes/${id}`);
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
