import { useContext } from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview.jsx'
import SummeryPreview from './preview/SummeryPreview.jsx'
import ExperiencePreview from './preview/ExperiencePreview.jsx'
import EducationalPreview from './preview/EducationalPreview.jsx'
import SkillsPreview from './preview/SkillsPreview.jsx'

function   ResumePreview() {
  const {resumeInfo} = useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
      style={{borderColor: resumeInfo?.themeColor}}
    >
          {/* personal detail */}
             <PersonalDetailPreview resumeInfo={resumeInfo}/>
          {/* summary */}
             <SummeryPreview resumeInfo={resumeInfo} />
          {/* professional  experience */}
             <ExperiencePreview resumeInfo={resumeInfo} />
          {/* educational */}
             <EducationalPreview resumeInfo={resumeInfo} />
          {/* skills */}
             <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumePreview
