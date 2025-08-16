function ProjectPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Projects
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {project?.name}
          </h2>

          <h2 className="text-xs flex justify-between">
            <span>
              {project?.startDate} -{' '}
              {project?.currentlyWorking ? 'Present' : project?.endDate}
            </span>
            {project?.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-2"
              >
                Link
              </a>
            )}
          </h2>

          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: project?.description }}
          />

          {project?.technologies?.length > 0 && (
            <p className="text-xs italic">
              <span className="font-semibold">Tech:</span>{' '}
              {project.technologies.join(', ')}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProjectPreview
