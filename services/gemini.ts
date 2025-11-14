import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { geminiContent } from "../types/recipe";
require("dotenv").config();
class GeminiRecipeAI {
  private static instance: GeminiRecipeAI;
  private model: GenerativeModel;
  private readonly systemInstruction: string;

  private constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);

    this.systemInstruction = `
      You are a specialized Nigerian AI assistant for a recipe generation platform for Nigerian dishes.
      Your sole purpose is to assist users in cooking, food preparation, meal planning,
      ingredient analysis, recipe creation, and dietary advice.
      If a user asks a question that is NOT directly related to food or recipes,
      you must respond with:
      "I'm sorry, I can only help with food and recipe-related questions."

      Always keep answers concise, clear, and food-focused.
      Always use the base64 string image if provided as additional context.
    `;

    this.model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: this.systemInstruction,
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
  public async generateWithImages(content: geminiContent): Promise<string> {
    try {
      const result = await this.model.generateContent({
        contents: content,
      });
      return result.response.text();
    } catch (error: any) {
      console.error("GeminiRecipeAI Error:", error);
      throw new Error(error.message || "Failed to generate recipe response");
    }
  }

  public async analyzeImage(base64: string) {
    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");

    // Dynamically detect MIME type (optional)
    const mimeMatch = base64.match(/^data:(image\/[a-zA-Z+]+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const prompt = `
  What is food is this image and can you tell me what food i can make using that ingredient that is related to Nigeria
  `;
    //   const prompt = `
    // what is this
    // if this is a food or an ingredient of food respond but only if it is or else say u dont know
    // `;

    try {
      const result = await this.model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              { inlineData: { mimeType: "image/jpeg", data: cleanBase64 } },
            ],
          },
        ],
      });

      const rawOutput = result.response.text().trim();

      // Clean out potential code block formatting (```json ... ```)
      // const cleanJson = rawOutput.replace(/```json|```/g, "").trim();

      // Try parsing the cleaned JSON
      // return JSON.parse(rawOutput);
      return rawOutput;
      // return JSON.parse(cleanJson);
    } catch (error: any) {
      console.error("GeminiRecipeAI analyzeImage Error:", error);
      throw new Error(error.message || "Failed to analyze image");
    }
  }
}

export const geminiRecipeAI = GeminiRecipeAI.getInstance(
  process.env.GEMINI_API_KEY!
);
