import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

export async function describeImg(image_url) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

  const imageUrl = image_url;

  const response = await fetch(imageUrl);
  const imageArrayBuffer = await response.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64ImageData,
      },
    },
    { text: "Describe this image for a visually impaired person please. No more than 50 words." }
  ],
  });
  return (result.text);
}