import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Workout extends Document {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly name: string;
  readonly mode: string;
  readonly reps: number;
  readonly exercises: [number, string][];
  readonly versionKey: null;
}
