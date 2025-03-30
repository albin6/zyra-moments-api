import { ObjectId } from "mongoose";

export interface IMessageEntity {
  _id?: string | ObjectId;
  chatRoomId: string | ObjectId;
  content: string;
  senderId: string;
  senderType: "Client" | "Vendor";
  read: boolean;
  isFile: boolean;
  readReceipt?: "sent" | "delivered" | "seen";
  createdAt?: Date;
  updatedAt?: Date;
}
