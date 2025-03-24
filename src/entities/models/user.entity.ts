import { ObjectId } from "mongoose";
import { TRole } from "../../shared/constants";

export interface IUserEntity {
  _id?: ObjectId;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  googleId: string;
  role: TRole;
  profileImage?: string;
  phoneNumber?: string;
  masterOfCeremonies?: boolean;
  onlineStatus?: "online" | "offline";
  lastStatusUpdated: Date;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}
