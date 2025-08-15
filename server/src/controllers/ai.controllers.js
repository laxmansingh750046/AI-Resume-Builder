import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_API_KEY, 
});

export const generateAIResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const tools = [{ googleSearch: {} }];
    const config = { thinkingConfig: { thinkingBudget: -1 }, tools };
    const model = 'gemini-2.5-flash';
    const contents = [{ role: 'user', parts: [{ text: prompt }] }];
    
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    const text = response.candidates[0]?.content?.parts[0]?.text || '';
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: 'AI request failed' });
  }
};
