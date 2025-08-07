import React, { useEffect } from 'react'
import Header from '../../../components/custom/Header'
import { Button } from '../../../components/ui/button'
import ResumePreview from '../../../dashboard/resume/components/ResumePreview'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const {resumeId} = useParams();
  
  useEffect(()=>{
    getResumeInfo();
  },[])
  const getResumeInfo =()=>{
    API.getResumeById(resumeId).then(res=>{
        console.log(res);
    })
  }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <Header />
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <h2 className='text-center text-2xl font-medium'>Congrats! Your Ultimate AI generates Resume is ready !</h2>
        <p className='text-center text-gray-400'>Now u r ready to download ur resume and u can share it also </p>
        <div className='flex justify-between px-44 my-10'>
            <Button>Download</Button>
            <Button>Share</Button>
        </div>
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
