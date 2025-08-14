import React from "react";
import Header from "../components/custom/Header.jsx";
import { ArrowRight, Sparkles, FileText, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen flex flex-col">
      <Header />

      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 md:py-28">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
            Build Your{" "}
            <span className="text-indigo-600">AI-Powered Resume</span> in
            Minutes
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Say goodbye to boring templates — our AI crafts professional,
            job-ready resumes that stand out and get noticed.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg font-medium hover:bg-indigo-700 transition flex items-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRelSasKhP0d5ANMSse5P2xapRdT3t-udW2Lg&s"
            alt="AI Resume Illustration"
            className="w-full max-w-lg drop-shadow-xl"
          />
        </div>
      </section>

      {/* features */}
      <section className="bg-white py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Why Choose Our AI Resume Builder?
        </h2>
        <p className="text-gray-600 text-center mt-2 max-w-2xl mx-auto">
          We make resume creation fast, easy, and tailored to your career goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <FeatureCard
            icon={<Sparkles size={40} className="text-indigo-600" />}
            title="AI-Powered Content"
            description="Our AI suggests professional, impactful bullet points and summaries for your field."
          />
          <FeatureCard
            icon={<FileText size={40} className="text-indigo-600" />}
            title="ATS-Friendly"
            description="Your resume will be optimized to pass Applicant Tracking Systems with ease."
          />
          <FeatureCard
            icon={<Rocket size={40} className="text-indigo-600" />}
            title="Fast & Easy"
            description="Create and download your resume in less than 10 minutes with our simple interface."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Land Your Dream Job?
        </h2>
        <p className="mt-3 text-lg">
          Let our AI help you make a resume that gets interviews.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-block px-8 py-4 bg-white text-indigo-600 rounded-xl text-lg font-medium hover:bg-gray-100 transition"
        >
          Start Building Now
        </Link>
      </section>
   
      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <About />
        © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition">
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}

function About() {
  return (
    <div className=" mx-auto p-6 bg-slate-800 rounded-lg flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-500 mb-4">About Me</h1>
      <p className="text-gray-300 mb-4 text-center">
        Hi! I'm <span className="font-semibold text-white">Laxman Singh Bisht</span>, a passionate full-stack developer who loves crafting 
        clean, user-friendly, and impactful web applications. Currently, I’m focused on 
        building tools that make people’s lives easier — like this AI Resume Builder.
      </p>

      <h2 className="text-xl font-semibold text-white mt-6 mb-2">Why I Built This</h2>
      <p className="text-gray-300 mb-4 text-justify">
        Creating a professional resume can be time-consuming and stressful, especially for 
        those without design or formatting skills. I built this AI Resume Builder to 
        simplify that process — allowing users to generate ATS-friendly, 
        beautifully formatted resumes in minutes. This project combines my 
        skills in full-stack development with my interest in AI-powered automation 
        to deliver a seamless and accessible experience for job seekers worldwide.
      </p>

      <h2 className="text-xl font-semibold text-white mt-6 mb-2">Tech Stack</h2>
      <ul className="pl-5 text-gray-300">
        <li>Frontend: React, Tailwind CSS</li>
        <li>Backend: Node.js, Express.js</li>
        <li>Database: MongoDB with Mongoose</li>
        <li>Authentication: Clerk for secure sign-in/sign-up</li>
        <li>AI Integration: OpenAI API for content generation</li>
        <li>File Handling: PDF/Docx export functionality</li>
        <li>Deployment: Vercel (Frontend) & Render (Backend)</li>
        <li>Version Control: Git & GitHub</li>
      </ul>

      <div className="mt-8 flex flex-col items-center gap-2">
        <a 
          href="https://portfolio-jet-kappa-56.vercel.app/" 
          className="text-purple-400 hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Visit my portfolio →
        </a>
        <a 
          href="https://www.linkedin.com/in/laxman-singh-bisht-437058268/" 
          className="text-blue-400 hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Connect on LinkedIn →
        </a>
      </div>
    </div>
  );
}

export default Home;
