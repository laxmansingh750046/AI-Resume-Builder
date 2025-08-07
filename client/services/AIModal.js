// npm install @google/genai mime
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY, 
});

export async function AIChatSession(prompt) {
  const tools = [{ googleSearch: {} }];
  
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };

  const model = 'gemini-2.5-flash';
  const contents = [
    { role: 'user', parts: [{ text: prompt }] },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  return response.candidates[0].content.parts[0].text;
}
