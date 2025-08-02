import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection.jsx';
import ResumePreview from '../../components/ResumePreview.jsx';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext.jsx';
import dummy from '../../../../data/dummy.jsx'

function EditResume() {
  const [resumeInfo, setResumeInfo] = useState();
  
  const params = useParams();
  useEffect(()=>{
      setResumeInfo(dummy);
  },[])
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
