import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
require("dotenv").config();
class GeminiRecipeAI {
  private static instance: GeminiRecipeAI;
  private model: GenerativeModel;
  // private readonly systemInstruction: string;

  private constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);

    // this.systemInstruction = `
    //   You are a specialized Nigerian AI assistant for a recipe generation platform for Nigerian dishes.
    //   Your sole purpose is to assist users in cooking, food preparation, meal planning,
    //   ingredient analysis, recipe creation, and dietary advice.
    //   If a user asks a question that is NOT directly related to food or recipes,
    //   you must respond with:
    //   "I'm sorry, I can only help with food and recipe-related questions."

    //   Always keep answers concise, clear, and food-focused.
    //   Always use the links if provided as additional context.
    // `;

    this.model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      // systemInstruction: this.systemInstruction,
    });
  }

  public static getInstance(apiKey: string): GeminiRecipeAI {
    if (!GeminiRecipeAI.instance) {
      GeminiRecipeAI.instance = new GeminiRecipeAI(apiKey);
    }
    return GeminiRecipeAI.instance;
  }

  public async generate(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      console.error("GeminiRecipeAI Error:", error);
      throw new Error(error.message || "Failed to generate recipe response");
    }
  }
}

export const geminiRecipeAI = GeminiRecipeAI.getInstance(
  process.env.GEMINI_API_KEY!
);
