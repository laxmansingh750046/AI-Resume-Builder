import { PlusSquare } from "lucide-react";
import {Button} from "../../components/ui/button.jsx"
import {Input} from "../../components/ui/input.jsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid'

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");

  const onCreate = ()=>{
    const uuid = uuidv4();
    console.log(resumeTitle," ",uuid)
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
                disabled={!resumeTitle} 
                onClick={onCreate}>Create</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
