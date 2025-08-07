import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api",
  withCredentials: true
});

const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data);

const GetUserResumes=()=>axiosClient.get(`/user-resumes`);

const GetResumeById=(id)=>axiosClient.get(`/user-resumes/${id}`)

const UpdateResumeDetail=(id,data)=>axiosClient.put(`/user-resumes?id=${id}`,data)

const DeleteResumeById=(id)=>axiosClient.delete(`/user-resumes?id=${id}`)

export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
}