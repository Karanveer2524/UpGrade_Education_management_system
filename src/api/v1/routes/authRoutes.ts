import express from "express";
import { AuthController } from "../controllers/authController";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new users with roles
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Standard email/password login
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /auth/set-claims:
 *   post:
 *     summary: Modify user roles/permissions
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Claims set successfully
 */
router.post("/set-claims", AuthController.setClaims);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List users (filter by role/institution)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
router.get("/users", AuthController.listUsers);

/**
 * @swagger
 * /users/bulk:
 *   post:
 *     summary: Import users via CSV
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Users imported successfully
 */
router.post("/users/bulk", AuthController.bulkImport);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user profiles
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/users/:id", AuthController.updateUser);

export default router;
