import { Schema } from 'mongoose';

export const ExerciseSchema = new Schema(
  {
    name: String,
    type: String,
  },
  {
    timestamps: false,
    versionKey: false,
  },
);
