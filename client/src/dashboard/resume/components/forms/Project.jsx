import { Button } from '../../../../components/ui/button.jsx'
import { Input } from '../../../../components/ui/input.jsx'
import { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext.jsx'
import { useParams } from 'react-router-dom'
import API from './../../../../../services/API.js'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'

const formField = {
  name: '',
  description: '',
  technologies: [],
  link: '',
  startDate: '',
  endDate: '',
  currentlyWorking: false,
}

function Projects({enabledNext}) {
  const [projectList, setProjectList] = useState([formField])
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const { getToken } = useAuth()

  useEffect(() => {
    resumeInfo?.projects?.length > 0 && setProjectList(resumeInfo?.projects)
  }, [resumeInfo])

  const handleChange = (index, event) => {
    enabledNext(false);
    const newEntries = [...projectList]
    const { name, value, type, checked } = event.target
    newEntries[index][name] = type === 'checkbox' ? checked : value
    setProjectList(newEntries)
    setResumeInfo({ ...resumeInfo, projects: newEntries })
  }

  const handleRichTextEditor = (e, name, index, value) => {
    enabledNext(false);
    const newEntries = [...projectList]
    if (e) newEntries[index][name] = e.target.value
    else newEntries[index][name] = value
    setProjectList(newEntries)
    setResumeInfo({ ...resumeInfo, projects: newEntries })
  }

  const AddNewProject = () => {
    setProjectList([...projectList, { ...formField }])
  }

  const RemoveProject = () => {
    enabledNext(false);
    setProjectList((prev) => prev.slice(0, -1))
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        projects: projectList.map(({ id, ...rest }) => rest),
      },
    }

    API.UpdateResumeDetail(params?.resumeId, data, getToken).then(
      (res) => {
        enabledNext(true);
        setLoading(false)
        toast('Projects updated!')
      },
      (error) => {
        setLoading(false)
      }
    )
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Projects</h2>
        <p>Add your personal or professional projects</p>
        <div>
          {projectList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Project Name</label>
                  <Input
                    name="name"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.name}
                  />
                </div>
                <div>
                  <label className="text-xs">Project Link</label>
                  <Input
                    name="link"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.link}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    name="startDate"
                    type="text"
                    placeholder="e.g. Feb 2022"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    name="endDate"
                    type="text"
                    placeholder="e.g. Aug 2022"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="currentlyWorking"
                      checked={item?.currentlyWorking}
                      onChange={(event) => handleChange(index, event)}
                    />
                    Currently Working
                  </label>
                </div>
                <div className="col-span-2">
                  <label className="text-xs">Description</label>
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.description}
                    onRichTextEditorChange={(event, val = null) =>
                      handleRichTextEditor(event, 'description', index, val)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs">Technologies (comma separated)</label>
                  <Input
                    name="technologies"
                    onChange={(event) =>
                      handleChange(index, {
                        target: {
                          name: 'technologies',
                          value: event.target.value.split(','),
                        },
                      })
                    }
                    defaultValue={item?.technologies?.join(', ')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewProject}
              className="text-primary"
            >
              + Add More Project
            </Button>
            <Button
              variant="outline"
              onClick={RemoveProject}
              className="text-primary"
            >
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Projects
