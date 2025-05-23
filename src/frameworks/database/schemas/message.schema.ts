import { Schema } from "mongoose";
import { IMessageModel } from "../models/message.model";

export const messageSchema = new Schema<IMessageModel>(
  {
    chatRoomId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    senderId: { type: String, required: true },
    senderType: { type: String, enum: ["Client", "Vendor"], required: true },
    read: { type: Boolean, default: false },
    isFile: { type: Boolean, default: false },
    readReceipt: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
    },
  },
  {
    timestamps: true,
  }
);
