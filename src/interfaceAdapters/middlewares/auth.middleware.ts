import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwt.service";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import client from "../../frameworks/cache/redis.client";

const tokenService = new JwtService();

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export interface CustomRequest extends Request {
  user: CustomJwtPayload;
}

const extractToken = (
  req: Request
): { access_token: string; refresh_token: string } | null => {
  const pathSegments = req.path.split("/");
  const privateRouteIndex = pathSegments.indexOf("");

  if (privateRouteIndex !== -1 && pathSegments[privateRouteIndex + 1]) {
    const userType = pathSegments[privateRouteIndex + 1];
    return {
      access_token: req.cookies[`${userType}_access_token`] || null,
      refresh_token: req.cookies[`${userType}_refresh_token`] || null,
    };
  }

  return null;
};

const isBlacklisted = async (token: string): Promise<boolean> => {
  const result = await client.get(token);
  return result !== null;
};

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);

    if (!token) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }

    if (await isBlacklisted(token.access_token)) {
      res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Token is blacklisted" });
      return;
    }

    const user = tokenService.verifyAccessToken(
      token.access_token
    ) as CustomJwtPayload;

    if (!user || !user.id) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }

    (req as CustomRequest).user = {
      ...user,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.TOKEN_EXPIRED });
      return;
    }
    console.log("token is invalid is worked");

    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    return;
  }
};

export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);
    if (!token) {
      console.log("no token");
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }
    if (await isBlacklisted(token.access_token)) {
      console.log("token is black listed is worked");
      res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Token is blacklisted" });
      return;
    }

    const user = tokenService.decodeAccessToken(token?.access_token);
    console.log("decoded", user);
    (req as CustomRequest).user = {
      id: user?.id,
      email: user?.email,
      role: user?.role,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
    next();
  } catch (error) {}
};

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user;

    if (!user || !allowedRoles.includes(user.role)) {
      console.log("role not allowed");
      res.status(HTTP_STATUS.FORBIDDEN).json({
        message: ERROR_MESSAGES.NOT_ALLOWED,
        userRole: user ? user.role : "None",
      });
      return;
    }
    next();
  };
};
