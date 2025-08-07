import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: String,
  companyName: String,
  city: String,
  state: String,
  startDate: String,
  endDate: String,
  currentlyWorking: Boolean,
  workSummery: String,
});

const educationSchema = new mongoose.Schema({
  universityName: String,
  startDate: String,
  endDate: String,
  degree: String,
  major: String,
  description: String,
});

const skillSchema = new mongoose.Schema({
  name: String,
  rating: Number,
});

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  jobTitle: String,
  address: String,
  phone: String,
  email: String,
  themeColor: String,
  summery: String,
  experience: [experienceSchema],
  education: [educationSchema],
  skills: [skillSchema],
}, {
  timestamps: true,
});

export const Resume = mongoose.model("Resume", resumeSchema);
