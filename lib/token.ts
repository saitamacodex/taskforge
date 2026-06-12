import jwt from "jsonwebtoken";
import ApiError from "./apiError";

export interface UserTokenPayload {
  id: string;
  email: string;
}

export const generateToken = (payload: UserTokenPayload) => {
  if (!process.env.JWT_SECRET) {
    throw ApiError.NOT_FOUND("JWT_SECRET is missing");
  }
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as UserTokenPayload;

    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
