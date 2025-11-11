import { Request, Response } from "express";
import { updateProfilePayload } from "../types/user";
import { User } from "../models/User";

export const updateProfile = async (req: Request, res: Response) => {
  const { username, email, password, profilePic } =
    req.body as updateProfilePayload;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.update({
      email,
      password,
      profilePic,
      username,
    });

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
    });
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
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "Account deleted succeefully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete account",
      error,
    });
  }
};
