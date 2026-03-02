import { geminiModel } from '../config/gemini';
import { ComplaintCategory } from '../models/Complaint';

export interface ProcessedComplaint {
  cleanTitle: string;
  cleanDescription: string;
  category: ComplaintCategory;
  severity: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  department: string;
  rtiDraft: string;
}

const SYSTEM_PROMPT = `You are a civic-tech AI assistant for the "Shame The Lane" platform.
Your job is to process raw citizen rants about civic issues and convert them into:
1. A clean, professional complaint title and description
2. Category classification
3. Severity (1=minor, 5=critical)
4. Relevant tags
5. Responsible government department
6. RTI (Right to Information) draft letter

Always respond in valid JSON format.`;

export const processRant = async (
  rawRant: string,
  location: string
): Promise<ProcessedComplaint> => {
  const prompt = `${SYSTEM_PROMPT}

Raw citizen rant:
"${rawRant}"

Location: ${location}

Respond with JSON in this exact format:
{
  "cleanTitle": "...",
  "cleanDescription": "...",
  "category": "road|water|electricity|garbage|sewage|encroachment|corruption|noise|other",
  "severity": 1-5,
  "tags": ["tag1", "tag2"],
  "department": "...",
  "rtiDraft": "..."
}`;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI did not return valid JSON');

  return JSON.parse(jsonMatch[0]) as ProcessedComplaint;
};

export const reprocessComplaint = async (
  complaintId: string,
  rawRant: string,
  location: string
): Promise<ProcessedComplaint> => {
  return processRant(rawRant, location);
};
