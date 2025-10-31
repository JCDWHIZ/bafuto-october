import { Request, Response } from "express";

export const uploadIngredient = async (req: Request, res: Response) => {};
export const createRecipie = async (req: Request, res: Response) => {}; // should accept images and possible prompt
// export const getRecipie = async (req: Request, res: Response) => {};
export const getRecipie = async (req: Request, res: Response) => {}; // using created recipie as context ask questions only relating to the recipie created
export const getRecipies = async (req: Request, res: Response) => {};
