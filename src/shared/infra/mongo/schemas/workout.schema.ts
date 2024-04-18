import { Schema } from 'mongoose';

export const WorkoutSchema = new Schema(
  {
    name: String,
    mode: String,
    reps: Number,
    exercises: Array<[number, string]>,
  },
  {
    timestamps: false,
    versionKey: false,
  },
);
