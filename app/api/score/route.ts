// app/api/score/route.ts
import { Ollama } from 'ollama';
import { z } from 'zod';
import mammoth from 'mammoth';

// @ts-ignore - Bypass the buggy index.js test runner in pdf-parse
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

// Force standard Node.js runtime for fs module compatibility (needed for pdf-parse)
export const runtime = 'nodejs';

// System prompt for Ollama
const systemPrompt = `You are an expert Applicant Tracking System (ATS) optimizer. 
Your task is to analyze the provided RESUME against the JOB DESCRIPTION.

EVALUATION CRITERIA:
1. Hard Skills Match: Direct technical skills mentioned.
2. Experience Level: Years of experience and seniority match.
3. Industry Context: Familiarity with the specific business sector.

OUTPUT RULES:
- Provide a match_score from 0-100.
- List specific missing_keywords (tools, languages, or certifications).
- Reasoning must be concise (max 3 sentences) focusing on the gap.
- Extract the candidate's name. If not found, return "Unknown".
- Return EXACTLY and ONLY valid JSON matching this structure:
{
  "candidate_name": "String",
  "match_score": Number,
  "missing_keywords": ["String"],
  "reasoning": "String"
}`;

// Define expected JSON structure
const ScoreSchema = z.object({
  candidate_name: z.string(),
  match_score: z.number().min(0).max(100),
  missing_keywords: z.array(z.string()),
  reasoning: z.string(),
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get('resume') as File;
    const jd = formData.get('jobdesc') as string;

    if (!resumeFile || !jd) {
      return new Response(JSON.stringify({ error: 'Missing resume or JD' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let resumeText = '';

    // PDF parsing
    if (resumeFile.type === 'application/pdf') {
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer); // Node Buffer
      const data = await pdfParse(buffer);
      resumeText = data.text;
    }
    // DOC/DOCX parsing
    else if (
      resumeFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      resumeFile.type === 'application/msword'
    ) {
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer); // Use Node Buffer for Mammoth as well
      const result = await mammoth.extractRawText({ buffer }); 
      resumeText = result.value;
    }
    else {
      return new Response(JSON.stringify({ error: 'Unsupported file type' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

    const response = await ollama.chat({
      model: 'mistral',
      format: 'json', // Force structured JSON output
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `JOB DESCRIPTION:\n${jd}\n\nRESUME TEXT:\n${resumeText}` },
      ],
      options: {
        temperature: 0.1, // Low temperature for consistent formatting
        num_ctx: 8192,
      },
    });

    // Strip markdown code blocks in case the model hallucinates them despite format: 'json'
    let rawContent = response.message.content.trim();
    if (rawContent.startsWith('```json')) {
      rawContent = rawContent.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (rawContent.startsWith('```')) {
      rawContent = rawContent.replace(/^```/, '').replace(/```$/, '').trim();
    }

    // Parse and Validate output
    const parsedData = JSON.parse(rawContent);
    const validatedData = ScoreSchema.parse(parsedData);

    return new Response(JSON.stringify(validatedData), { 
      headers: { 'Content-Type': 'application/json' } 
    });
    
  } catch (error) {
    console.error('Analysis Error:', error);
    
    // Provide a slightly more descriptive error message to the client
    const errorMessage = error instanceof Error ? error.message : 'Failed to process document';
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}