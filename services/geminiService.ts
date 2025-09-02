
import { GoogleGenAI } from "@google/genai";
import { PartyInput } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function mediateNegotiation(partyA: PartyInput, partyB: PartyInput): Promise<string> {
  const prompt = `
    You are a world-class, impartial negotiation mediator based on the principles of game theory and interest-based bargaining. You will be given the confidential positions, interests, and constraints of two parties, Party A and Party B. Your task is to analyze this confidential information and devise a fair, optimal, and mutually beneficial solution that addresses the underlying interests of both parties, not just their stated positions.

    CRITICAL INSTRUCTIONS:
    1.  DO NOT reveal Party A's interests or constraints to Party B.
    2.  DO NOT reveal Party B's interests or constraints to Party A.
    3.  Your final output should ONLY be the proposed solution, presented in a clear, neutral, and actionable format. Start with a heading like "### Proposed Solution".
    4.  If a mutually beneficial agreement is possible, present the solution. Use markdown for clarity.
    5.  If, after careful analysis, no zone of possible agreement exists based on the provided information, you must state this clearly and concisely. You may suggest fallback options or areas for further discussion if applicable, but without revealing any confidential information. For example, state "Based on the information provided, a direct zone of agreement could not be identified."
    6.  Keep the tone professional and constructive.

    Here is the confidential information for each party:

    ---
    **Party A (Confidential):**
    - **Position:** ${partyA.position}
    - **Underlying Interests:** ${partyA.interests}
    - **Constraints/Preferences/Goals:** ${partyA.constraints}
    ---
    **Party B (Confidential):**
    - **Position:** ${partyB.position}
    - **Underlying Interests:** ${partyB.interests}
    - **Constraints/Preferences/Goals:** ${partyB.constraints}
    ---

    Now, based *only* on the information provided, generate the mediated solution to be shown to both parties.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while communicating with the AI mediator: ${error.message}`;
    }
    return "An unknown error occurred while communicating with the AI mediator.";
  }
}
