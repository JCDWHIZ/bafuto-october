import { Request, Response } from "express";
import { createRecipiePayload, geminiContent } from "../types/recipe";
import { geminiRecipeAI } from "../services/gemini";
import path from "path";
import cloudinary from "../config/cloudinaryConfig";
import { Ingredient } from "../models/Ingredients";
import { Recipie } from "../models/Recipie";

// export const uploadIngredient = async (req: any, res: Response) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" }); // this checks if the file is included in the body
//     }
//     const imagePath = path.resolve(__dirname, "../uploads", req.file.filename); // this gets the file path

//     const result = await cloudinary.uploader.upload(imagePath); // this uploads the image to cloudinary

//     res.json({
//       message: "File uploaded successfully",
//       data: result,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to upload ingredients",
//       error,
//     });
//   }
// };
export const uploadIngredient = async (req: any, res: Response) => {
  try {
    const { images } = req.body;
    const user = req.user;
    let results = [];
    for (let index = 0; index < images.length; index++) {
      const element = images[index];

      const result = await cloudinary.uploader.upload(element);
      await Ingredient.create({
        imageBase64: element,
        imageUrl: result.secure_url,
        userId: user.id,
      });
      results.push(result);
    }

    res.json({
      message: "File uploaded successfully",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to upload ingredients",
      error,
    });
  }
};
export const createRecipie = async (req: any, res: Response) => {
  const { ingredients, prompt } = req.body as createRecipiePayload;
  const user = req.user;
  try {
    const recipePrompt = `
You are an AI chef for a Nigerian cooking app.

You will receive 1 or more food images (sent separately as inlineData).  
First, analyze each image and identify what ingredient(s) it contains.

Then, using the:
- recognized ingredients from images  
- user's cooking prompt  

Generate possible Nigerian recipes.

Output format (MUST be valid JSON):

{
  "recipes": [
    {
      "title": "string",
      "description": "string",
      "ingredients": [{ "name": "string", "quantity": "string" }],
      "instructions": "string",
      "prepTime": number,
      "cookTime": number,
      "imagePassed": ["recognized ingredient names"],
      "servings": number,
      "tags": ["string"]
    }
  ]
}

Rules:
- Only use ingredients commonly available in Nigeria.
- If multiple images/ingredients are provided, suggest 2–4 recipes.
- No markdown, no explanations.
- Always identify the ingredients in the images FIRST and use them as context.
- "imagePassed" must list exactly what was visually recognized.
- Keep instructions accurate, realistic, and authentic.

User Prompt: ${prompt}
`;

    const cleanImages = ingredients.map((img) =>
      img.replace(/^data:image\/\w+;base64,/, "")
    );

    const contents: geminiContent = [
      {
        role: "user",
        parts: [
          { text: recipePrompt },
          ...cleanImages.map((imgBase64) => ({
            inlineData: {
              mimeType: "image/jpeg",
              data: imgBase64,
            },
          })),
        ],
      },
    ];

    const aiResponse = await geminiRecipeAI.generateWithImages(contents);

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
          title: r.title,
          description: r.description,
          ingredients: r.ingredients,
          instructions: r.instructions,
          prepTime: r.prepTime,
          cookTime: r.cookTime,
          servings: r.servings,
          tags: r.tags,
          userId: user.id,
        }))
      : [];

    await Recipie.bulkCreate(recipes);

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

//     const prompt = `
//     You are a vision analysis AI.

// Analyze the image provided and describe ONLY what you can visually identify with high confidence.
// Do not guess or assume anything not clearly visible.

// For each recognized item, include:
// - name: what the item is (e.g., fried plantain, tomatoes, palm oil)
// - type: whether it’s an ingredient, meal, packaged item, or kitchen object
// - description: short, factual summary of what you see
// - confidence: percentage (0–100) of how sure you are

// Return ONLY valid JSON in the format:
// {
//   "items": [
//     { "name": "string", "type": "string", "description": "string", "confidence": number }
//   ]
// }

// Image URL: <your image URL>
