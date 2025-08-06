import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../components/ui/input'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
 
function Skills() {
  const [skillsList, setSkillsList] = useState([{
    name: '',
    rating: 0,
  }]);
  const [loading, setLoading] = useState(false)
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext); 

  const handleChange = (index, name, value)=>{
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  }

  const AddNewSkills = ()=>{
    setSkillsList([...skillsList, ,{
      name: '',
      rating: 0
    }])
  }

  const RemoveSkills = ()=>{
    setSkillsList(skillsList=>skillsList.slice(0,-1));
  }

  const onSave = ()=>{

  }

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList
    })
  },[skillsList])

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Skills</h2>
        <p>Add Your top Professional skills</p>
       </div>
       <div>
         {skillsList.map((item, index)=>(
            <div className='flex justify-between mb-2 border rounded-lg p-3'>
                <div>
                    <label className='text-xs'>Name</label>
                    <Input className="w-full" onChange= {(e)=>handleChange(index, 'name', e.target.value)} />
                </div>
                <Rating style={{ maxWidth: 100 }} value={item.rating} 
                  onChange={(v)=>handleChange(index, 'rating', v)}
                />
            </div>
         ))}
       </div>
       <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
            <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Skills
