import { Controller, Get, Param } from '@nestjs/common';
import { WorkoutsService } from '../services/workouts.service';
import { Workout } from 'src/shared/infra/mongo/interfaces/workout.interface';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get('pokemon/:id')
  async getWorkoutByPokemonId(@Param('id') id: string): Promise<Workout> {
    return this.workoutsService.getWorkoutByPokemonId(id);
  }
}
