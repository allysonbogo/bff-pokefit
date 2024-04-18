import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  public pokeApi = axios.create({
    baseURL: process.env.POKEMON_API_URL,
  });

  public wodwellWebsite = axios.create({
    baseURL: process.env.WODWELL_URL,
  });

  public wodwellApi = axios.create({
    baseURL: process.env.WODWELL_API_URL,
  });
}
