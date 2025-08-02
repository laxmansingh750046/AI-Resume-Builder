import { Loader2, PlusSquare} from "lucide-react";
import {Button} from "../../components/ui/button.jsx"
import {Input} from "../../components/ui/input.jsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog.jsx";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid'
import { useUser } from "@clerk/clerk-react";
import API from '../../services/API.js'
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useUser();
  const navigation = useNavigate();

  const onCreate = ()=>{
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName
      }
    }
    API.createResume(data)
      .then(res=>{
        console.log(res.data.data.documentId)
        if(res){
          navigation('/dashboard/resume/'+res.data.data.documentId+'/edit')
        }
      })
      .finally(setLoading(false))
  }
  return (
    <div>
      <div
        className="p-14 py-24 border items-center 
         flex justify-center bg-secondary rounded-lg h-[280px] 
         hover:scale-105 transition-all hover:shadow-md"
         onClick={()=>setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input className="my-2" 
                placeholder="Ex.Full Stack resume" 
                onChange = {(e)=>setResumeTitle(e.target.value)}  
              />
            </DialogDescription>
            <div className="flex justify-end gap-4">
              <Button variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
              <Button 
                disabled={!resumeTitle || loading} 
                onClick={onCreate}>
                  {loading
                  ? <Loader2 className="animate-spin" />
                  : "Create"}
                </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
