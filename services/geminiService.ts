
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateStoryFromImage(
  base64Image: string,
  mimeType: string
): Promise<{ english: string; urdu: string }> {
  try {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: "Based on this image, write a short, creative, and imaginative story between 100 and 150 words. Provide the story in both English and Urdu.",
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            english: {
              type: Type.STRING,
              description: "The story written in English.",
            },
            urdu: {
              type: Type.STRING,
              description: "The story written in Urdu.",
            },
          },
          required: ["english", "urdu"],
        },
      },
    });

    const storyObject = JSON.parse(response.text);

    if (!storyObject || !storyObject.english || !storyObject.urdu) {
      throw new Error("API returned an incomplete story object. Please try again.");
    }

    return storyObject;
  } catch (error) {
    console.error("Error generating story from Gemini API:", error);
    // Provide a more user-friendly error message
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("The configured API key is not valid. Please check your configuration.");
    }
    throw new Error("Failed to generate a story. The AI may be experiencing high traffic or the image could not be processed.");
  }
}
