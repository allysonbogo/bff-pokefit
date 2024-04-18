import { Module } from '@nestjs/common';
import { PokemonsController } from './modules/pokemons/controllers/pokemons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonsService } from './modules/pokemons/services/pokemons.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ApiService } from './shared/infra/api/api.service';
import { WorkoutsController } from './modules/workouts/controllers/workouts.controller';
import { WorkoutsService } from './modules/workouts/services/workouts.service';
import { WorkoutSchema } from './shared/infra/mongo/schemas/workout.schema';
import { WorkoutRepository } from './shared/infra/mongo/repositories/workout.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: 'workout', schema: WorkoutSchema }]),
    HttpModule,
  ],
  controllers: [PokemonsController, WorkoutsController],
  providers: [ApiService, PokemonsService, WorkoutsService, WorkoutRepository],
})
export class AppModule {}
