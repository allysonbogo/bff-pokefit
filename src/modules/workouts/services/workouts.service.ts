import { BadRequestException, Injectable } from '@nestjs/common';
import { WorkoutRepository } from 'src/shared/infra/mongo/repositories/workout.repository';
import { ApiService } from 'src/shared/infra/api/api.service';

@Injectable()
export class WorkoutsService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly apiService: ApiService,
  ) {}

  async getWorkoutByPokemonId(id: string): Promise<any> {
    const { data: pokeData } = await this.apiService.pokeApi.get(
      `/pokemon/${id}`,
    );

    const pokeInfo = {
      types: pokeData.types.map((type: any) => type.type.name),
      height: pokeData.height,
      weight: pokeData.weight,
    };

    const workouts = await this.workoutRepository
      .getWorkoutByType(pokeInfo.types)
      .catch(() => {
        throw new BadRequestException('There is no workout with this type');
      });

    if (!workouts)
      throw new BadRequestException('There is no workout with this type');

    const hash = eval(process.env.HASH_SECRET) * Number(process.env.HASH_SALTS);

    const position = Math.abs(hash) % workouts.length;

    const name = workouts[position].name.replace(/\s+/g, '-');

    const { data: wodWebsite } = await this.apiService.wodwellWebsite.get(
      `/wod/${name.replace('the-incredible-hulk', 'incredible-hulk')}`,
    );

    const wodInfoRegex = /wodInfo\s+=\s+({.*?});/s;
    const wodInfoMatch = wodWebsite.match(wodInfoRegex);
    const wodInfo = JSON.parse(wodInfoMatch[1]);

    const { data: wodData } = await this.apiService.wodwellApi.get(
      `/wods/${wodInfo.id}`,
    );

    return {
      name: workouts[position].name,
      wodData,
    };
  }
}
