import { Button } from "../../../../components/ui/button.jsx";
import { Textarea } from "../../../../components/ui/textarea.jsx";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { default as API } from "../../../../../services/API.js";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../services/AIModal.js";
import { useAuth } from '@clerk/clerk-react';


function buildResumeDetails(resumeInfo) {
  if (!resumeInfo) return "";

  const experiences = resumeInfo.experience || [];
  const companyTitles = experiences
    .map(exp => {
      const parts = [];
      if (exp.companyName) parts.push(exp.companyName);
      if (exp.title) parts.push(`as ${exp.title}`);
      return parts.join(" ");
    })
    .filter(Boolean)
    .join(", ");

  const skills = (resumeInfo.skills || [])
    .map(skill => skill.name)
    .filter(Boolean)
    .join(", ");

  const educations = (resumeInfo.education || [])
    .map(edu => {
      let eduStr = "";
      if (edu.degree) eduStr += edu.degree;
      if (edu.major) eduStr += ` in ${edu.major}`;
      if (edu.universityName) eduStr += ` from ${edu.universityName}`;
      return eduStr.trim();
    })
    .filter(Boolean)
    .join(", ");

  let detailsParts = [];
  if (companyTitles) detailsParts.push(`Worked at ${companyTitles}`);
  if (skills) detailsParts.push(`skilled in ${skills}`);
  if (educations) detailsParts.push(`education includes ${educations}`);

  return detailsParts.join(", ") + ".";
}


const prompt = `
  You are writing a professional resume summary.
  Job Title: {jobTitle}
  Experience Level: {level}
  Key Details: {details}

  Based on the above information, write a concise, impactful summary in 3-4 lines highlighting professional strengths, key achievements, and relevant expertise. The tone should be confident and tailored for job applications.
`;
function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("Freasher");
  const { getToken } = useAuth();
  const params = useParams();

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);
  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt
                    .replace("{jobTitle}", resumeInfo?.jobTitle)
                    .replace("{level}", level)
                    .replace("{details}", buildResumeDetails(resumeInfo));

    
    try {
      const aiResponseText = await AIChatSession(PROMPT);
      setSummery(aiResponseText);
    } catch (error) {
      console.error("Error generating summary:", error);
    }

    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    API.UpdateResumeDetail(params?.resumeId, data, getToken ).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border-primary text-primary rounded p-2"
            >
              <option value="Fresher">Freseher</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
            <Button
              variant="outline"
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery}
            defaultValue={summery ? summery : resumeInfo?.summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Summery;
