import { AuthService } from "../services/authService";
import { Request, Response } from "express";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await AuthService.registerUser(email, password);
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
      } else {
        res.status(500).json({ message: "Registration failed", error: "Unknown error" });
      }
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      // Implement login logic here
      // Placeholder response for now
      res.status(200).json({ message: "Login successful" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Login failed", error: error.message });
      } else {
        res.status(500).json({ message: "Login failed", error: "Unknown error" });
      }
    }
  }

  static async setClaims(req: Request, res: Response): Promise<void> {
    try {
      const { uid, claims } = req.body;
      const user = await AuthService.setCustomClaims(uid, claims);
      res.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to set claims", error: error.message });
      } else {
        res.status(500).json({ message: "Failed to set claims", error: "Unknown error" });
      }
    }
  }

  static async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const { pageSize, pageToken } = req.query;
      const users = await AuthService.listUsers(Number(pageSize), pageToken as string | undefined);
      res.status(200).json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to retrieve users", error: error.message });
      } else {
        res.status(500).json({ message: "Failed to retrieve users", error: "Unknown error" });
      }
    }
  }

  static async bulkImport(req: Request, res: Response): Promise<void> {
    try {
      const users: { email: string; password: string }[] = req.body.users;
      const result = await AuthService.bulkImportUsers(users);
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Bulk import failed", error: error.message });
      } else {
        res.status(500).json({ message: "Bulk import failed", error: "Unknown error" });
      }
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await AuthService.updateUserProfile(id, data);
      res.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: "User update failed", error: error.message });
      } else {
        res.status(500).json({ message: "User update failed", error: "Unknown error" });
      }
    }
  }
}
