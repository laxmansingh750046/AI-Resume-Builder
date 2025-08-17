import { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '../../../components/ui/button.jsx'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import Summery from './forms/Summery.jsx';
import Experience from './forms/Experience.jsx';
import Education from './forms/Education.jsx';
import Projects from './forms/Project.jsx';
import Skills from './forms/Skills.jsx';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(true);
  const {resumeId}=useParams();
  return (
    <div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-5'>
            <Link to={"/dashboard"}>
              <Button><Home/></Button>
            </Link>
          <ThemeColor/>
         
          </div>
          <div className='flex gap-2'>
            {activeFormIndex>1
            &&<Button size="sm" 
            onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/> </Button> }
            <Button 
            disabled={!enableNext}
            className="flex gap-2" size="sm"
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}
            > Next 
            <ArrowRight/> </Button>
          </div>
        </div>
        {/* Personal Detail  */}
        {activeFormIndex==1?  
        <PersonalDetail enabledNext={setEnableNext}/>
        :activeFormIndex==2?
        <Education enabledNext={setEnableNext}/>
        :activeFormIndex==3?
        <Experience enabledNext={setEnableNext}/>  
        :activeFormIndex==4?
        <Skills enabledNext={setEnableNext}/>
        :activeFormIndex==5?
        <Projects enabledNext={setEnableNext}/>
        :activeFormIndex==6?
        <Summery enabledNext={setEnableNext}/>
        :activeFormIndex==7?
        <Navigate to={'/my-resume/'+resumeId+"/view"}/>
              
        :null
          }
    </div>
  )
}

export default FormSection