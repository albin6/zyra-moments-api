import { config } from "../../shared/config";

export const corsOptions = {
  origin: [
    config.cors.ALLOWED_ORIGIN_ONE,
    config.cors.ALLOWED_ORIGIN_TWO,
    config.cors.ALLOWED_ORIGIN_LOCAL_ONE,
    config.cors.ALLOWED_ORIGIN_LOCAL_TWO,
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type", "stripe-signature"],
  credentials: true,
};
