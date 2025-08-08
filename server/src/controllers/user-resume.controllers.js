import { Resume } from "../models/resume-model.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const CreateNewResume = asyncHandler(async (req, res) => {
    const { title, userEmail, userName } = req.body;
    const userId = req.auth?.userId;
    
    const names = userName.trim().split(" ");
    const firstName = names[0];
    const lastName = names.length > 1 ? names[names.length - 1] : "";
    
    const newResume = await Resume.create({
        userId,
        jobTitle: title,
        email: userEmail,
        firstName,
        lastName
    });
    
    return res.status(201).json({
        data:{success: true,
        message: "Resume created successfully",
        documentId: newResume._id}
    });
});


export const GetUserResumes = asyncHandler(async (req, res) => {
    const userId = req.auth?.userId;
    if(!userId){
      return res.status(401).json({
        success: false,
        message: "userid not found"
      });
    }

    const userResumes = await Resume.find({userId})
        .select("_id themeColor jobTitle")
        .lean();

    const formattedResumes = userResumes.map((resume) => ({
      resumeId: resume._id,
      themeColor: resume.themeColor,
      title: resume.jobTitle
    }));
    
    return res.status(200).json({
        success: true,
        message: "User resumes retrieved successfully",
        data: formattedResumes,
    });
});


export  const GetResumeById = asyncHandler(async (req, res) => {
  const resumeId = req.params.id;
  const userId = req.auth.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. User ID not found.",
    });
  }

  const resume = await Resume.findOne({ _id: resumeId, userId });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found or does not belong to the user.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Resume fetched successfully",
    data: resume,
  });
});


export const UpdateResumeDetail = asyncHandler(async (req, res) => {
    
    return res.status(200).json({
        success: true,
        message: "Resume updated successfully"
    });
});


export const DeleteResumeById = asyncHandler(async (req, res) => {

    return res.status(200).json({
        success: true,
        message: "Resume deleted successfully"
    });
});
