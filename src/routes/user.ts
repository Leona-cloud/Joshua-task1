import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import unsplashApi from "../utils/unsplash";
import UserAuth from "../middlewares/authentication";

const UserRouter: Router = Router();

UserRouter.post("/email", async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || email === null) {
    return res.status(400).json({
      success: "false",
      message: "Email is required",
    });
  }

  const accessToken = await jwt.sign({ email: email }, process.env.secret_key as string, {
    expiresIn: process.env.expires_at as string,
  });


  return res.status(200).json({
    success: true,
    message: "Token retrieved successfully",
    data: {
      token: accessToken,
    },
  });
});

UserRouter.get('/image', UserAuth, async (req: Request, res: Response) => {
    const { searchParam } = req.query; // Changed from req.params to req.query

    if (!searchParam || searchParam === null) {
        return res.status(400).json({
            success: false,
            message: 'searchParam cannot be empty'
        });
    }

    try {
        const images = await unsplashApi(searchParam as string); // Type assertion for searchParam

        if (!images) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Images retrieved successfully',
            data: {
                images: images
            }
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});


export default UserRouter;