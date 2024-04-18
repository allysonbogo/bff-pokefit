import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Exercise extends Document {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly name: string;
  readonly type: string;
}
