import { Request, Response } from "express";
import { updateProfilePayload } from "../types/user";

export const updateProfile = async (req: Request, res: Response) => {
  const { username, email, password, profilePic } =
    req.body as updateProfilePayload;
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update profile",
      error,
    });
  }
};
export const getProfile = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get profile",
      error,
    });
  }
};
export const upgradeSubscription = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Failed to upgrade subscription",
      error,
    });
  }
};
export const cancelSubscription = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Failed to cancel subscription",
      error,
    });
  }
};
export const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete account",
      error,
    });
  }
};
