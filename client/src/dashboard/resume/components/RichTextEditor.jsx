import { Button } from '../../../components/ui/button.jsx';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext.jsx';
import { Brain, LoaderCircle } from 'lucide-react';
import { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../services/AIModal.js';
import { toast } from 'sonner';

const PROMPT = `
    Position title: {positionTitle}. 
    Based on this position title, write 5–6 bullet points for my resume experience. 
    Return the result strictly as an HTML <ul> element with <li> items, no other text, no explanations, and no code block formatting. 
    Output only the HTML snippet.
  `;
function RichTextEditor({jobTitle,onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false);
    
    const GenerateSummeryFromAI=async()=>{
      if(!jobTitle){
        toast('Please Add Position Title');
        return ;
      }
      setLoading(true)
      const prompt=PROMPT.replace('{positionTitle}',jobTitle);
      
      const result=await AIChatSession(prompt);
      console.log("result", result);
      setValue(result);
      onRichTextEditorChange(null,result);
      setLoading(false);
    }
  
    return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Brain className='h-4 w-4'/> Generate from AI 
           </>
        }
         </Button>
      </div>  
    <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor