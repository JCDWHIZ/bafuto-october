import { Ingredient } from "../models/Ingredients";
import { Recipie } from "../models/Recipie";
import { User } from "../models/User";

export interface updateProfilePayload {
  username: string;
  password: string;
  profilePic: string;
  email: string;
}

export type models = {
  User: typeof User;
  Recipie: typeof Recipie;
  Ingredients: typeof Ingredient;
};
