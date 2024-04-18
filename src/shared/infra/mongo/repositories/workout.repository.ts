import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout } from '../interfaces/workout.interface';

@Injectable()
export class WorkoutRepository {
  constructor(
    @InjectModel('workout') private readonly workoutModel: Model<Workout>,
  ) {}

  async getWorkoutByType(types: string[]): Promise<Workout[]> {
    return this.workoutModel.aggregate([
      { $unwind: '$exercises' },
      {
        $lookup: {
          from: 'exercises',
          localField: 'exercises.1',
          foreignField: 'name',
          as: 'exercise_info',
        },
      },
      { $unwind: '$exercise_info' },
      {
        $match: {
          $or: types.map((type) => ({ 'exercise_info.type': type })),
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);
  }
}
