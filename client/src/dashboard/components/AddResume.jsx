import { Loader2, PlusSquare, Upload } from "lucide-react";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog.jsx";
import { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import API from "../../../services/API.js";
import { useNavigate } from "react-router-dom";

const promptBase = `
You are an AI that reads resumes in plain text and extracts:
- firstName, lastName, jobTitle, address, phone, email, summery
- experience[] {
    title, 
    companyName, 
    city, 
    state, 
    startDate, 
    endDate, 
    currentlyWorking, 
    workSummery (must be returned as a complete HTML <ul> list with <li> bullet points describing responsibilities/achievements)
  }
- education[] {universityName, startDate, endDate, degree, major, description}
- skills[] {name, rating: (1-5)}
Return ONLY raw JSON in this exact schema with no code fences, no markdown, and no extra text:
{
  firstName: "",
  lastName: "",
  jobTitle: "",
  address: "",
  phone: "",
  email: "",
  summery: "",
  experience: [],
  education: [],
  skills: []
}
`;

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState(null);
  const { user } = useUser();
  const navigation = useNavigate();
  const { getToken } = useAuth();

  // const fileToBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result.split(",")[1]);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(file);
  //   });

  const onCreate = () => {
    setLoading(true);
    const data = {
      title: resumeTitle,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };
    API.CreateNewResume(data, getToken)
      .then((res) => {
        if (res) {
          navigation("/dashboard/resume/" + res.data.data.documentId + "/edit");
        }
      })
      .finally(() => setLoading(false));
  };

  const onPasteResume = async () => {
    setLoading(true);
    try {
      const createRes = await API.CreateNewResume(
        {
          title: resumeTitle || "Imported Resume",
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        },
        getToken
      );
      const docId = createRes.data.data.documentId;

      let aiResult = await API.AIChatSession(promptBase + "\n" + resumeText);
      if (aiResult.startsWith("```")) {
        aiResult = aiResult
          .replace(/^```[a-z]*\n?/i, "")
          .replace(/\n?```$/, "");
      }
      let parsedData;
      try {
        parsedData = JSON.parse(aiResult);
      } catch (err) {
        console.error("AI returned invalid JSON:", aiResult);
        throw new Error("Failed to parse AI output");
      }

      await API.UpdateResumeDetail(docId, { data: parsedData }, getToken);

      navigation(`/dashboard/resume/${docId}/edit`);
    } catch (error) {
      alert("Failed to process your resume. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //create from file upload
  // const onUploadOldResume = async () => {
  //   setLoading(true);
  //   try {
  //     const createRes =await API.CreateNewResume(
  //       {
  //         title: resumeTitle || "Imported Resume",
  //         userEmail: user?.primaryEmailAddress?.emailAddress,
  //         userName: user?.fullName,
  //       },
  //       getToken
  //     );
  //     console.log("create res", createRes)
  //     console.log("Hell yeah123")
  //     const docId = createRes.data.data.documentId;
  //     const base64Content = await fileToBase64(resumeFile);
  //     console.log("base64",base64Content);
  //     return;
  //     const aiPrompt =
  //       promptBase +
  //       "\nThe following is a resume file in base64 encoding. Please extract the structured data:\n";
  //     const aiResult = await AIChatSession(aiPrompt + base64Content);

  //     let parsedData;
  //     try {
  //       parsedData = JSON.parse(aiResult);
  //     } catch (err) {
  //       console.error("AI returned invalid JSON:", aiResult);
  //       throw new Error("Failed to parse AI output");
  //     }

  //     await API.UpdateResumeDetail(docId, { data: parsedData }, getToken);

  //     navigation(
  //       "/dashboard/resume/" + createRes.data.data.documentId + "/edit"
  //     );
  //   } catch (error) {
  //     alert("Failed to process your old resume. Please try again.");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center 
         flex justify-center bg-secondary rounded-lg h-[280px] 
         hover:scale-105 transition-all hover:shadow-md"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <>Add a title for your new resume</>
              <Input
                className="my-2"
                placeholder="Ex.Full Stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {/* OR Upload Your Old Resume
              <Input
                type="file"
                accept=".pdf,.docx,.txt"
                className="mt-3 cursor-pointer border border-blue-300 rounded px-3 py-2 bg-white hover:border-blue-500 transition"
                onChange={(e) => setResumeFile(e.target.files[0])}
              /> */}
              Or paste your old resume text
              <textarea
                className="w-full h-40 mt-2 border border-blue-300 rounded p-3 bg-white hover:border-blue-500 transition"
                placeholder="Copy the text from your old resume  and paste it here"
                onChange={(e) => setResumeText(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpenDialog(false), setResumeFile(null);
                }}
              >
                Cancel
              </Button>
              {resumeText ? (
                <Button disabled={loading} onClick={onPasteResume}>
                  {loading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              ) : (
                <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                  {loading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
