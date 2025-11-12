export interface registerAccountPayload {
  email: string;
  password: string;
  username: string;
}

export interface setPasswordPayload {
  token: string;
  password: string;
}

export type loginPayload = Omit<registerAccountPayload, "username">;

export type forgotPasswordPayload = Omit<
  registerAccountPayload,
  "username" | "password"
>;

export type DecodedUser = {
  id: string;
  email: string;
  username: string;
};
