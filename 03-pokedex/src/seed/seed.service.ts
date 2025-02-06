import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters';


@Injectable()
export class SeedService {


    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: AxiosAdapter,
    ) {}


    async executeSeed() {
        await this.pokemonModel.deleteMany({})//Elimina todos los registros de la colección
        const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

        // const insertPromises = [];
        // data.results.forEach(async ({ name, url }) => {
        //     const segments = url.split('/');
        //     const no = +segments[segments.length - 2];
        //     // const pokemon = await this.pokemonModel.create({ no, name });
        //     insertPromises.push(this.pokemonModel.create({ no, name }));
        // });
        // await Promise.all(insertPromises);

        const pokemonsToInsert: { name: string, no: number }[] = [];
        data.results.forEach(({ name, url }) => {
            const segments = url.split('/');
            const no = +segments[segments.length - 2];
            pokemonsToInsert.push({ no, name });
        });

        await this.pokemonModel.insertMany(pokemonsToInsert);
        return 'Seed Executed';
    }


}
