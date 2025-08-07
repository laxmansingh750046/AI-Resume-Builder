import { Resume } from "../models/resume-model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const CreateNewResume = asyncHandler(async (req, res) => {
    const { firstName, lastName, email } = req.body;

    const newResume = await Resume.create({
        firstName,
        lastName,
        email
    });

    res.status(201).json({
        success: true,
        message: "Resume created successfully",
        data: newResume
    });
});


export const GetUserResumes = asyncHandler(async (req, res) => {
    const resumes = await Resume.find();

    res.status(200).json({
        success: true,
        count: resumes.length,
        data: resumes
    });
});


export const GetResumeById = asyncHandler(async (req, res) => {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
        res.status(404);
        throw new Error("Resume not found");
    }

    res.status(200).json({
        success: true,
        data: resume
    });
});


export const UpdateResumeDetail = asyncHandler(async (req, res) => {
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedResume) {
        res.status(404);
        throw new Error("Resume not found for update");
    }

    res.status(200).json({
        success: true,
        message: "Resume updated successfully",
        data: updatedResume
    });
});


export const DeleteResumeById = asyncHandler(async (req, res) => {
    const deleted = await Resume.findByIdAndDelete(req.params.id);

    if (!deleted) {
        res.status(404);
        throw new Error("Resume not found for deletion");
    }

    res.status(200).json({
        success: true,
        message: "Resume deleted successfully"
    });
});
