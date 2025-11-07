import { Request, Response } from "express";
import { createRecipiePayload } from "../types/recipe";
import { geminiRecipeAI } from "../services/gemini";

export const uploadIngredient = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Failed to upload ingredients",
      error,
    });
  }
};
export const createRecipie = async (req: Request, res: Response) => {
  const { ingredients, prompt } = req.body as createRecipiePayload;

  try {
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const recipePrompt = `
  You are an AI chef for a Nigerian cooking app.
  Using the user's prompt and the provided food images, generate a list of possible recipe ideas.

  ✅ Output format (MUST be valid JSON):
  {
    "recipes": [
      {
        "title": "string",
        "description": "string",
        "ingredients": [{ "name": "string", "quantity": "string" }],
        "instructions": "string",
        "prepTime": number,
        "cookTime": number,
        "imagePassed": ["string"]
        "servings": number,
        "tags": ["string"]
      }
    ]
  }

  Rules:
  - Only use ingredients commonly available in Nigeria.
  - Suggest 2–4 possible recipes if multiple ingredients are provided.
  - Do not include markdown, commentary, or code formatting.
  - Keep instructions realistic and authentic.
  - always recognize the image first and use the image as context
  - inside the imagePassed object put the name of what you recognized from the images that is passed

  Prompt: ${prompt}
  Images (ingredients): ${ingredients?.join(", ") || "none"}
  `;

    const aiResponse = await geminiRecipeAI.generate(recipePrompt);

    // 🧠 Try parsing Gemini’s JSON output
    let recipesData;
    try {
      const clean = sanitizeAIResponse(aiResponse);
      recipesData = JSON.parse(clean);
    } catch {
      console.error("Invalid AI response:", aiResponse);
      return res.status(500).json({ error: "AI returned invalid JSON" });
    }

    // Ensure it's an array of recipes
    const recipes = Array.isArray(recipesData.recipes)
      ? recipesData.recipes.map((r: any, index: number) => ({
          id: index + 1,
          title: r.title,
          description: r.description,
          ingredients: r.ingredients,
          instructions: r.instructions,
          prepTime: r.prepTime,
          cookTime: r.cookTime,
          servings: r.servings,
          tags: r.tags,
          imagePassed: r.imagePassed,
          image: ingredients?.[index] || ingredients?.[0] || null,
          created_at: new Date(),
          updated_at: new Date(),
        }))
      : [];

    return res.status(201).json({
      success: true,
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create recipes",
      error,
    });
  }
}; // should accept images and possible prompt
// export const getRecipie = async (req: Request, res: Response) => {};
export const getRecipie = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get recipie",
      error,
    });
  }
}; // using created recipie as context ask questions only relating to the recipie created
export const getRecipies = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get recipies",
      error,
    });
  }
};

export const recognizeImage = async (req: Request, res: Response) => {
  const { ingredients } = req.body as createRecipiePayload;

  try {
    const recipePrompt = `
    You are a vision analysis AI.

Analyze the image provided and describe ONLY what you can visually identify with high confidence.
Do not guess or assume anything not clearly visible.

For each recognized item, include:
- name: what the item is (e.g., fried plantain, tomatoes, palm oil)
- type: whether it’s an ingredient, meal, packaged item, or kitchen object
- description: short, factual summary of what you see
- confidence: percentage (0–100) of how sure you are

Return ONLY valid JSON in the format:
{
  "items": [
    { "name": "string", "type": "string", "description": "string", "confidence": number }
  ]
}

Image URL: ${ingredients?.join(", ") || "none"}
  `;

    const aiResponse = await geminiRecipeAI.generate(recipePrompt);
    console.log(aiResponse);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get recipies",
      error,
    });
  }
};

function sanitizeAIResponse(aiText: string): string {
  return aiText
    .replace(/```json|```/g, "") // remove markdown code fences
    .replace(/^[^{\[]*/, "") // remove anything before JSON starts
    .replace(/[^}\]]*$/, "") // remove anything after JSON ends
    .trim();
}
