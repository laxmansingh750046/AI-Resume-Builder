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

  const resume = await Resume.findOne({ _id: resumeId });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found or does not belong to the user.",
      data: resume
    });
  }

  return res.status(200).json({
    success: true,
    message: "Resume fetched successfully",
    data: resume,
  });
});


export const UpdateResumeDetail = asyncHandler(async (req, res) => {
    const resumeId = req.params.id;
    const updateData = req.body.data;

     if (!resumeId) {
        return res.status(400).json({
            success: false,
            message: "Resume ID is required"
        });
    }

    const updateResume = await Resume.findByIdAndUpdate(
      resumeId,
      {$set: updateData},
      {new: true, runValidators: true}
    )

    if(!updateResume){
      return res.status(404).json({
        success: false,
        message: "resume not found"
      });
    }

    return res.status(200).json({
        success: true,
        message: "Resume updated successfully",
        data: updateResume
    });
});


export const DeleteResumeById = asyncHandler(async (req, res) => {
    const resumeId = req.params.id;

    if (!resumeId) {
        return res.status(400).json({
            success: false,
            message: "Resume ID is required"
        });
    }

    const deletedResume = await Resume.findByIdAndDelete(resumeId);

    if (!deletedResume) {
        return res.status(404).json({
            success: false,
            message: "Resume not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Resume deleted successfully",
        data: deletedResume
    });
});
