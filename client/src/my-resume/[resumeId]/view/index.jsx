import { useEffect, useState } from 'react'
import Header from '../../../components/custom/Header'
import { Button } from '../../../components/ui/button'
import ResumePreview from '../../../dashboard/resume/components/ResumePreview'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import API from '../../../../services/API'
import { useAuth } from '@clerk/clerk-react'
import ShareButton from '../../../components/custom/ShareButton'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const {resumeId} = useParams();
  const { getToken } = useAuth();
  
  useEffect(()=>{
    getResumeInfo();
  },[])

  const getResumeInfo =()=>{
    API.GetResumeById(resumeId, getToken).then(res=>{
        setResumeInfo(res.data.data);
    })
  }

  const handleDownload = ()=>{
    window.print();

  }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div id="no-print">
          <Header />
          <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <h2 className='text-center text-2xl font-medium'>Congrats! Your Ultimate AI generates Resume is ready !</h2>
            <p className='text-center text-gray-400'>Now u r ready to download ur resume and u can share it also </p>
            <div className='flex justify-between px-44 my-10'>
                <Button onClick={handleDownload}>Download</Button>
                <ShareButton videoUrl={window.location.href}>Share</ShareButton>
            </div>
          </div>
      </div>
      <div id="print-area" className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
