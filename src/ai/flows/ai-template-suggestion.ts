'use server';
/**
 * @fileOverview An AI assistant that suggests business card templates and theme options based on user profile details.
 *
 * - aiTemplateSuggestion - A function that handles the AI template suggestion process.
 * - AiTemplateSuggestionInput - The input type for the aiTemplateSuggestion function.
 * - AiTemplateSuggestionOutput - The return type for the aiTemplateSuggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiTemplateSuggestionInputSchema = z.object({
  profession: z.string().describe('The user\'s profession, e.g., "Software Engineer", "Product Designer".'),
  industry: z.string().describe('The industry the user works in, e.g., "Tech", "Finance", "Creative Arts".'),
  desiredStyle: z.string().describe('The desired aesthetic style for the business card, e.g., "minimalist", "modern", "bold", "elegant".'),
});
export type AiTemplateSuggestionInput = z.infer<typeof AiTemplateSuggestionInputSchema>;

const AiTemplateSuggestionOutputSchema = z.object({
  templateName: z.string().describe('The name of the suggested business card template.'),
  templateDescription: z.string().describe('A brief description of the suggested template.'),
  themeColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).describe('A suitable primary theme color for the template in hexadecimal format (e.g., "#5048e5").'),
  themeFont: z.string().describe('A suitable font name for the template (e.g., "Inter", "Space Grotesk").'),
});
export type AiTemplateSuggestionOutput = z.infer<typeof AiTemplateSuggestionOutputSchema>;

export async function aiTemplateSuggestion(input: AiTemplateSuggestionInput): Promise<AiTemplateSuggestionOutput> {
  return aiTemplateSuggestionFlow(input);
}

const aiTemplateSuggestionPrompt = ai.definePrompt({
  name: 'aiTemplateSuggestionPrompt',
  input: { schema: AiTemplateSuggestionInputSchema },
  output: { schema: AiTemplateSuggestionOutputSchema },
  prompt: `You are an expert business card design assistant. Your goal is to suggest a suitable business card template and theme options based on the user's profile information.

Here are the user's details:
Profession: {{{profession}}}
Industry: {{{industry}}}
Desired Style: {{{desiredStyle}}}

Based on these details, please suggest a template name, a brief description for it, a suitable primary theme color in hexadecimal format, and a suitable font. Make sure the suggestions align with the provided input.
`,
});

const aiTemplateSuggestionFlow = ai.defineFlow(
  {
    name: 'aiTemplateSuggestionFlow',
    inputSchema: AiTemplateSuggestionInputSchema,
    outputSchema: AiTemplateSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await aiTemplateSuggestionPrompt(input);
    return output!;
  },
);
