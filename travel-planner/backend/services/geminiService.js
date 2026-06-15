import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GOOGLE_GEMINI_API_KEY);

export const getGenerativeModel = () => {
  return genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });
};

export const generateTripItinerary = async (prompt) => {
  try {
    const model = getGenerativeModel();
    const chatSession = model.startChat({
      history: [],
    });
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating trip:', error);
    throw new Error('Failed to generate trip itinerary');
  }
};
