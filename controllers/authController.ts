import { Request, Response } from "express";
import {
  forgotPasswordPayload,
  loginPayload,
  registerAccountPayload,
  setPasswordPayload,
} from "../types/auth";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { sendResetPasswordEmail } from "../config/email";

const jwtsecret = process.env.JWT_SECRET || "";

export const registerAccount = async (req: any, res: Response) => {
  console.log("inside register accoutn", req.user);
  const { email, password, username } = req.body as registerAccountPayload;
  try {
    const isEmailTaken = await User.findOne({
      where: {
        email,
      },
    });

    if (isEmailTaken) {
      return res.status(400).json({
        message: "This email has been taken",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register account",
      error,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as loginPayload;
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

    const token = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        username: user.dataValues.username,
      },
      jwtsecret,
      {
        expiresIn: "1hr",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to login",
      error,
    });
  }
};
export const setPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body as setPasswordPayload;
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Failed to set Password",
      error,
    });
  }
};
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body as forgotPasswordPayload;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        messsage: "User not found",
      });
    }
    const token = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        username: user.dataValues.username,
      },
      jwtsecret,
      {
        expiresIn: "1hr",
      }
    );

    const frontendResetUrl = `http://localhost:5173/auth/set-password?token=${token}`;

    // send email
    await sendResetPasswordEmail(user.dataValues.email, frontendResetUrl, {
      name: user.dataValues.name,
    });

    return res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to forget password",
      error,
    });
  }
};
