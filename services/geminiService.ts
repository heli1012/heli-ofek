
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export const getConciergeResponse = async (history: ChatMessage[], userInput: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Convert history to the format expected by the SDK
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Add the current user input
    contents.push({
      role: 'user',
      parts: [{ text: userInput }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: `You are the WIZO MOR 2026 AI Concierge. 
        Your main goal is to help delegates with their daily attendance and logistics.
        
        Guidelines:
        1. Be polite, professional, and welcoming.
        2. You can speak in Hebrew or English based on the user's preference.
        3. If a user asks about the program, refer to the following highlights:
           - Sunday: Opening Day at Sieff House.
           - Monday: Nir HaEmek Youth Village.
           - Tuesday: Jerusalem (National Institutions, Kotel, Daniel Hagari).
           - Wednesday: Northern Edge (Rosh Hanikra).
           - Thursday: Pedagogy & Farewell.
        4. Remind them that they can choose between Hilton, Carlton, or WIZO HQ (38 David Hamelech) for daily pickups.
        5. Keep answers concise and elegant.`
      }
    });

    return response.text || "I'm sorry, I couldn't process that. Please try again or contact helio@wizo.org.";

  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a slight technical issue. How else can I assist you?";
  }
};
