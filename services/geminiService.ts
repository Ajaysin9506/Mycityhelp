import { GoogleGenAI, Chat } from "@google/genai";

// Initialize the client
// NOTE: In a real production app, ensure API_KEY is set in environment variables.
// For this environment, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are 'CityBot', a helpful assistant for the MyCityHelp website. You help users find services, advise on civic issues, and match skills. Be concise, friendly, and helpful. If asked about specific local data, you can invent plausible examples or refer them to the specific sections of the site (Services, Skills, Complaints).",
    },
  });
};

export const analyzeLostItemDescription = async (description: string): Promise<string> => {
  if (!description) return '';
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze this lost/found item description and return a JSON object with 'category' (e.g. Pet, Electronics, Wallet) and a short 'summary' (max 10 words). Description: "${description}"`,
      config: {
        responseMimeType: 'application/json'
      }
    });
    return response.text || "{}";
  } catch (error) {
    console.error("Error analyzing text:", error);
    return "{}";
  }
};

export const summarizeComplaints = async (complaintsText: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Summarize the following list of civic complaints into a single paragraph for the city mayor, highlighting the most urgent issues: \n\n ${complaintsText}`
        });
        return response.text || "Unable to generate summary.";
    } catch (error) {
        console.error("Error summarizing complaints:", error);
        return "Service temporarily unavailable.";
    }
}