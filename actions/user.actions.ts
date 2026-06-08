"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { signUpSchema, signInSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  try {
    // request body validation
    const validateRegisterPayload = await signUpSchema.safeParseAsync({
      firstName,
      lastName,
      email,
      password,
    });

    if (!validateRegisterPayload.success) {
      return {
        success: false,
        message: validateRegisterPayload.error?.issues[0].message,
      };
    }

    // validate if user already exist or not
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (existingUser.length > 0) {
      return {
        message: `User with ${email} already exist.`,
        error: "Duplicate entry, please try to login.",
      };
    }

    // get some random strings for password hash
    const salt = randomBytes(32).toString("hex");
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    // register user in db
    const [registeredUser] = await db
      .insert(user)
      .values({
        firstName,
        lastName,
        email,
        password: hash,
        salt,
      })
      .returning({ id: user.id });

    return {
      success: true,
      message: "User has been created",
      data: {
        id: registeredUser?.id,
      },
    };
  } catch (error) {
    console.log("Error while signUp: ");
    return { success: false, errors: error };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const validateLoginPayload = await signInSchema.safeParseAsync({
      email,
      password,
    });

    if (!validateLoginPayload.success) {
      return {
        success: false,
        message: validateLoginPayload.error?.issues[0].message,
      };
    }

    const [selectUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (!selectUser) {
      return {
        success: false,
        message: `user with email ${email} does not exist`,
      };
    }

    // verify the password hash
    const salt = selectUser.salt;
    if (!salt) {
      return {
        success: false,
        message: "Salt not found in the database",
      };
    }
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    if (selectUser.password !== hash) {
      return {
        success: false,
        message: "User email or password is incorrect",
      };
    }
    // need to create token to-do

    return {
      success: true,
      message: "Sign in success",
    };
  } catch (error) {
    console.log("Error while login: ");
    return {
      success: false,
      errors: error,
    };
  }
}
