import { locationSchema } from "@/database/schemas/locationSchema"
import mongoose from "mongoose"

export const LocationModel =
  mongoose.models.Location || mongoose.model("Location", locationSchema)
