import React, { useEffect ,useState} from 'react'
import AddResume from './components/AddResume.jsx'
import { useUser } from '@clerk/clerk-react'
import API from '../../services/API.js';
import ResumeCardItem from './components/ResumeCardItem.jsx';
function Dashboard() {
  const [resumeList, setResumeList]=useState([]);
  const {user} = useUser();
  
  useEffect(()=>{
    user&&GetResumesList();
  },[user])

  const GetResumesList = ()=>{
    API.getUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(res=>{
      console.log(res.data);
      setResumeList(res.data);
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
        <h2 className='font-bold text-3xl'>My Resume</h2>
        <p>Start Creating AI resume</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5
          mt-10 
        '>
          <AddResume />
          {resumeList.length>0 && resumeList.map((resume, index)=>(
            <ResumeCardItem resume={resume} key={resume.resumeId}/>
          ))}
        </div>
    </div>
  )
}

export default Dashboard