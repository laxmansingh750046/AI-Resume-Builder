function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience?.map((experience, index) => (
        <div key={experience?._id || index} className="my-5">
          <h2 className="text-sm font-bold">{experience?.title}</h2>
          <h2 className="text-xs flex justify-between">
            {[experience?.companyName, experience?.city, experience?.state]
              .filter(Boolean) // removes null, undefined, and empty strings
              .join(", ")}
            <span>
              {experience?.startDate} TO{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>
          <div
            // className="text-xs my-2 list-disc list-inside"
            className="text-xs my-2 my-summery"
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
