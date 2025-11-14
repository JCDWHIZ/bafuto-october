export type createRecipiePayload = {
  ingredients: string[];
  prompt: string;
};

export type geminiContent = {
  role: string;
  parts: (
    | {
        inlineData: {
          mimeType: string;
          data: string;
        };
      }
    | {
        text: string;
      }
  )[];
}[];
