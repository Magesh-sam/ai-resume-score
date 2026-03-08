"use client"
import { ChangeEvent, useState, ButtonHTMLAttributes } from "react"
import ScoreResult, { ScoreData } from "./score-result";
import { Button } from "./ui/button";




const ResumeForm = () => {
    const [fileName, setFileName] = useState("")

    // 3. State for loading, errors, and the result data
    const [isLoading, setIsLoading] = useState(false)
    const [resultData, setResultData] = useState<ScoreData | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setResultData(null);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);

            const res = await fetch("/api/score", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setResultData(data); // Save the Ollama JSON to state
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        const file = files[0]
        const allowed = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]

        if (!allowed.includes(file.type)) {
            alert("Only PDF, DOCX allowed")
            e.target.value = ""
            setFileName("")
            return
        }

        setFileName(file.name)
    }

    const handleReset = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.currentTarget.reset()
        setFileName("")
        setResultData(null)
        setError(null)
    }

    return (
        <div className="flex flex-col items-center w-full px-4">
            <form onSubmit={handleSubmit} onReset={handleReset} className='w-full max-w-md border border-primary/30 dark:border-slate-900 p-5 mt-5 rounded-lg shadow-sm bg-white dark:bg-neutral-900'>

                <label htmlFor="jobdesc" className="block mb-4">
                    <span className="font-bold text-gray-900 dark:text-gray-100">Job Description</span>
                    <textarea
                        className="block mt-2 mb-3 border border-primary/50  w-full p-3 rounded bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-500/50"
                        name="jobdesc"
                        id="jobdesc"
                        rows={4}
                        placeholder="Please paste your job description here..."
                        required
                    />
                </label>

                <label
                    htmlFor="resume"
                    className="text-slate-500 dark:text-slate-400 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-primary/50 border-dashed mx-auto mb-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-3 fill-gray-500 dark:fill-gray-400" viewBox="0 0 32 32">
                        <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                        <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                    </svg>

                    Upload Resume

                    <input
                        type="file"
                        id="resume"
                        name="resume"
                        className="hidden"
                        required
                        onChange={handleFileChange}
                        accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                    />

                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-2">
                        PDF, DOCX are Allowed.
                    </p>

                    {fileName && (
                        <p className="text-sm text-primary mt-2 font-bold">{fileName}</p>
                    )}
                </label>

                {error && <p className="text-red-500 dark:text-red-400 text-sm mb-4 font-semibold">{error}</p>}

                <div className="flex gap-3 items-center">
                    <Button disabled={!fileName || isLoading} className="block pointer" variant="default">
                        {isLoading ? "Analyzing..." : "Check Score"}
                    </Button>

                    <Button type="reset" variant="outline" disabled={isLoading} className="dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-800">
                        Reset
                    </Button>
                </div>
            </form>

            {/* Conditionally render the result component below the form */}
            {resultData && <ScoreResult data={resultData} />}
        </div>
    )
}

export default ResumeForm