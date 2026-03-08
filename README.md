# Local AI Resume Scorer

A privacy-first, local Applicant Tracking System (ATS) optimizer built with Next.js. This application allows you to upload a resume (PDF or DOCX) and compare it against a specific Job Description. It uses local Large Language Models (LLMs) via Ollama to evaluate the match score, identify missing keywords, and provide a concise reasoning—all without sending your sensitive data to external APIs.

## Features

* **Privacy-First Validation:** Fully local LLM processing ensures your resume data never leaves your machine.

* **Multi-Format Support:** Accurately extracts text from both `.pdf` and `.docx` files.

* **Smart Scoring:** Evaluates hard skills, experience levels, and industry context to generate a 0-100 match score.

* **Actionable Feedback:** Identifies exactly which keywords or skills are missing from your resume.

* **Modern UI:** Responsive design with full Dark/Light mode support built with Tailwind CSS.

## Tech Stack

* **Frontend framework:** Next.js (React)

* **Styling:** Tailwind CSS

* **AI/LLM Integration:** [Ollama](https://ollama.com/) (Mistral model)

* **File Parsing:** `pdf-parse` (PDF) & `mammoth` (DOCX)

* **Validation:** Zod (for strictly typed JSON schemas)

## Prerequisites

Before running this project, ensure you have the following installed:

1. **Node.js** (v18 or higher)

2. **Ollama**: Download and install from [ollama.com](https://ollama.com/).

Once Ollama is installed, you need to pull the `mistral` model. Open your terminal and run:

\`\`\`bash
ollama run mistral
\`\`\`

*Keep Ollama running in the background for the API to process requests.*

## Installation

1. Clone the repository:

   \`\`\`bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   \`\`\`

2. Install the project dependencies:

   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. Start the Next.js development server:

   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. Open <http://localhost:3000> in your browser to view the application.

## Usage

1. Paste the target **Job Description** into the provided text area.

2. Click the upload area to select your **Resume** (`.pdf` or `.docx`).

3. Click **Check Score**.

4. Wait a few moments while the local Ollama instance analyzes the documents.

5. Review your Match Score, Missing Keywords, and the AI's reasoning to improve your application!

## Troubleshooting

* **API Route Hangs / Fails:** Ensure the Ollama desktop application is running locally and that the Mistral model has been successfully downloaded (`ollama pull mistral`).

* **PDF Parsing Errors:** The project utilizes a specific import structure (`pdf-parse/lib/pdf-parse.js`) to ensure compatibility with Next.js App Router and Webpack/Turbopack.

## Screenshots
![SS in Dark](https://github.com/Magesh-sam/ai-resume-score/blob/master/demo-dark.png)
![SS in Light](https://github.com/Magesh-sam/ai-resume-score/blob/master/demo-light.png)

  
