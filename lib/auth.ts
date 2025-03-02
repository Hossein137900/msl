"use server";
import { prisma } from "./prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "msl";

export async function signUp(
  name: string,
  phoneNumber: string,
  password: string
) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        name,
        phoneNumber,
        password, // In production, hash the password before storing
      },
    });

    const token = jwt.sign(
      { userId: user.id, phoneNumber: user.phoneNumber },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
      },
    };
  } catch (error) {
    throw error;
  }
}

export async function login(phoneNumber: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      // In production, compare hashed passwords
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { userId: user.id, phoneNumber: user.phoneNumber },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
      },
    };
  } catch (error) {
    throw error;
  }
}

// export function verifyToken(token: string) {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return decoded;
//   } catch (error) {
//     throw new Error("Invalid token");
//   }
// }
