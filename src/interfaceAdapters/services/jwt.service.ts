import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { ITokenService } from "../../useCases/auth/interfaces/token-service.interface";
import { config } from "../../shared/config";
import ms from "ms";
import { injectable } from "tsyringe";

interface JwtPayloadData {
  id: string;
  email: string;
  role: string;
}

@injectable()
export class JwtService implements ITokenService {
  private jwtSecret: Secret;
  private accessExpiresIn: string;
  private refreshExpiresIn: string;

  constructor() {
    this.jwtSecret = config.jwt.JWT_SECRET_KEY;
    this.accessExpiresIn = config.jwt.ACCESS_EXPIRES_IN;
    this.refreshExpiresIn = config.jwt.REFRESH_EXPIRES_IN;
  }

  generateAccessToken(payload: JwtPayloadData): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.accessExpiresIn as ms.StringValue,
    });
  }

  generateRefreshToken(payload: JwtPayloadData): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.refreshExpiresIn as ms.StringValue,
    });
  }

  verifyAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.jwtSecret) as JwtPayload;
    } catch (error) {
      console.error("Access token verification failed:", error);
      return null;
    }
  }

  verifyRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.jwtSecret) as JwtPayload;
    } catch (error) {
      console.error("Refresh token verification failed:", error);
      return null;
    }
  }

  decodeAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      console.error("Refresh token verification failed:", error);
      return null;
    }
  }
}
