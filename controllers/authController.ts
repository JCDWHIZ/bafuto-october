import { Request, Response } from "express";
import {
  forgotPasswordPayload,
  loginPayload,
  registerAccountPayload,
  setPasswordPayload,
} from "../types/auth";

export const registerAccount = async (req: Request, res: Response) => {
  const { email, password, username } = req.body as registerAccountPayload;
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "Failed to forget password",
      error,
    });
  }
};
