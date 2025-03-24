import { Schema } from "mongoose";
import { IServiceModel } from "../models/service.model";

export const serviceSchema = new Schema<IServiceModel>({
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  serviceTitle: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  availableDates: [
    {
      date: { type: String, required: true },
      timeSlots: [
        {
          startTime: { type: String, required: true },
          endTime: { type: String, required: true },
          capacity: { type: Number, required: true },
          count: { type: Number, default: 0 },
        },
      ],
    },
  ],
  serviceDescription: { type: String, required: true },
  serviceDuration: { type: Number, required: true },
  servicePrice: { type: Number, required: true },
  additionalHoursPrice: { type: Number, required: true },
  cancellationPolicies: { type: [String], required: true },
  termsAndConditions: { type: [String], required: true },
});
