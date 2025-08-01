const createResume = async ()=>{
   console.log("complete create resume");
   await new Promise((resolve) => setTimeout(resolve, 2000));
}

const getUserResumes = async (userEmail)=>{
   console.log("get resumes");
   await new Promise((resolve) => setTimeout(resolve, 2000));
}

const API = {
    createResume,
    getUserResumes
}
export default API;