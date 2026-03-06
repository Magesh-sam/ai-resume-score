import { submitForm } from "@/lib/actions"
import { Button } from "./ui/button"

const ResumeForm = () => {
    return (
        <form action={submitForm} className='max-w-md border border-primary p-5 mt-5'>
            <label htmlFor="resume" className="block mb-3 "><span className="font-bold">Resume </span>
                <input type="file" name="resume" id="resume" className="border-primary border px-3 mt-3" />
            </label>
            <label htmlFor="jobdesc" className="block">
                <span className="font-bold">Job Description</span>
                <textarea className="block mb-3 border border-primary w-full p-3" name="jobdesc" id="jobdesc" placeholder="please paste your job description..." />
            </label>
            <Button className="block pointer  " variant="default" >Check Score</Button>
        </form>
    )
}

export default ResumeForm