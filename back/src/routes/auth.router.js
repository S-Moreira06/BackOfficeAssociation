import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { forgotPassword, login, register, resetPassword, sendVerification, verifyUserEmail, deleteUser, getAllUsers,
    getUserDetail, updateUser } from "../controllers/auth.controller.js";
const authRouter = new Hono()

authRouter.post(
  "/register", zValidator('json',
    z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(8),
        firstname: z.string().min(2),
        lastname: z.string().min(2),
        address: z.string().min(6).max(300),
        city: z.string().min(3).max(50),
        phone: z.string().min(10).max(20),
        zip: z.string().min(5).max(5),
        role: z.string().min(5).max(20),
    })
  ),
  register
);

authRouter.put(
    "/:id", zValidator('json',
        z.object({
            email: z.string().email("Invalid email").optional(),
            password: z.string().min(8).optional(),
            firstname: z.string().min(2).optional(),
            lastname: z.string().min(2).optional(),
            address: z.string().min(6).max(300).optional(),
            city: z.string().min(3).max(50).optional(),
            phone: z.string().min(10).max(20).optional(),
            zip: z.string().min(5).max(5).optional(),
            role: z.string().min(5).max(20).optional(),
        })
    ),
    updateUser
);

authRouter.post(
  "/login",
  zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(8),
    })
  ),
  login
);

authRouter.post(
  "/forgot-password",
  zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
    })
  ),
  forgotPassword
);

authRouter.post(
  "/reset-password",
  zValidator('json',
    z.object({
      token: z.string(),
      password: z.string().min(8),
    })
  ),
  resetPassword
);

authRouter.post(
  "/send-verification",
  zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
    })
  ),
  sendVerification
);

authRouter.get(
  "/verify/:token",
  verifyUserEmail
);

authRouter.delete(
    "/delete",
    zValidator('json',
        z.object({
            id: z.string()
        })
    ),
    deleteUser
);

authRouter.get(
  "/",
  getAllUsers
);

authRouter.get(
    "/:id",
    getUserDetail
);


export default authRouter;
