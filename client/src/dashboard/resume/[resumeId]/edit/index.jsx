import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection.jsx';
import ResumePreview from '../../components/ResumePreview.jsx';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext.jsx';
import { useAuth } from '@clerk/clerk-react';
import API from '../../../../../services/API.js';

function EditResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const {resumeId} = useParams();
  const {getToken} = useAuth();

  useEffect(()=>{
      getResumeInfo();
  },[])

  const getResumeInfo = ()=>{
    API.GetResumeById(resumeId, getToken).then(res=>{
      console.log("data",res.data.data);
    setResumeInfo(res.data.data);})
  }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
            <ResumePreview />
            <FormSection />
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
