import admin from 'firebase-admin';
import { Request, Response } from 'express';
import * as Joi from 'joi';

export class AuthService {

  // Register User
  static async registerUser(email: string, password: string) {
    // Input validation
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required() // Basic password length validation
    });
    const { error } = schema.validate({ email, password });
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Create user in Firebase
    return await admin.auth().createUser({ email, password });
  }

  // Login User
  static async loginUser(email: string, password: string) {
    // Note: The Admin SDK doesn't handle user authentication directly (use Firebase client SDK for login)
    // You should handle login client-side and pass the ID token to the server to verify it.
    
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });
    const { error } = schema.validate({ email, password });
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      // Authenticate using Firebase Admin SDK or, typically, use Firebase client SDK to get the token on client side
      const userRecord = await admin.auth().getUserByEmail(email);
      return userRecord; // You can return a JWT token or user data here, depending on the auth flow
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Authentication failed: " + error.message);
      } else {
        throw new Error("Authentication failed due to an unknown error.");
      }
    }
  }

  // Set custom claims for a user
  static async setCustomClaims(uid: string, claims: object) {
    return await admin.auth().setCustomUserClaims(uid, claims);
  }

  // Bulk import users
  static async bulkImportUsers(users: Array<{ email: string, password: string }>) {
    const result = [];
    for (const user of users) {
      try {
        const createdUser = await admin.auth().createUser({ email: user.email, password: user.password });
        result.push(createdUser);
      } catch (error: unknown) {
        if (error instanceof Error) {
          result.push({ email: user.email, error: error.message });
        } else {
          result.push({ email: user.email, error: "Unknown error during user creation" });
        }
      }
    }
    return result;
  }

  // Update user profile
  static async updateUserProfile(uid: string, data: object) {
    return await admin.auth().updateUser(uid, data);
  }

  // List users
  static async listUsers(pageSize: number, pageToken?: string) {
    return await admin.auth().listUsers(pageSize, pageToken);
  }
}
