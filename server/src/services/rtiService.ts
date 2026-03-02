import { geminiModel } from '../config/gemini';

export interface RtiLetterParams {
  applicantName: string;
  applicantAddress: string;
  department: string;
  subject: string;
  issueDescription: string;
  location: string;
  date: string;
}

const RTI_SYSTEM_PROMPT = `You are a legal assistant specializing in Indian RTI (Right to Information) Act 2005.
Generate formal RTI applications that are legally sound and compelling.
The application should reference the RTI Act 2005, cite specific sections where applicable,
and clearly request specific information from the public authority.`;

export const generateRtiLetter = async (
  params: RtiLetterParams
): Promise<string> => {
  const prompt = `${RTI_SYSTEM_PROMPT}

Generate an RTI application with these details:
- Applicant: ${params.applicantName}
- Address: ${params.applicantAddress}
- Department: ${params.department}
- Subject: ${params.subject}
- Issue: ${params.issueDescription}
- Location: ${params.location}
- Date: ${params.date}

Generate a complete, formal RTI letter in plain text format suitable for submission.`;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
};

export const enhanceRtiDraft = async (
  draft: string,
  additionalContext: string
): Promise<string> => {
  const prompt = `${RTI_SYSTEM_PROMPT}

Existing RTI draft:
${draft}

Additional context to incorporate:
${additionalContext}

Improve and enhance this RTI draft while keeping it legally sound.`;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
};
