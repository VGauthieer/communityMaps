import { Schema } from "mongoose"

export const locationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },

  description: {
    type: String,
    default: "a house",
  },

  type: {
    type: String,
    default: "",
  },
})
