import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dtos';


@Injectable()
export class PokemonService {

    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>
    ) {}


    async create(createPokemonDto: CreatePokemonDto) {
        createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

        try {
            const pokemon = await this.pokemonModel.create(createPokemonDto);
            return pokemon;
            
        } catch (error) {
            this.handleExpetions(error);
        }
    }

    findAll(paginationDto: PaginationDto) {
        
        const { limit = 10, offset = 0 } = paginationDto;

        return this.pokemonModel.find()
            .skip(offset)
            .limit(limit)
            .select('-__v')
            .sort({ no: 1 });
    }

    async findOne(term: string) {
        let pokemon: Pokemon;
        
        if(!isNaN(+term)){
            pokemon = await this.pokemonModel.findOne({ no: term });
        }

        // if term is a Mongo Id
        if (!pokemon && isValidObjectId(term)) {
            pokemon = await this.pokemonModel.findById(term);
        }

        // if term is a string Name
        if(!pokemon) pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });

        if(!pokemon) throw new NotFoundException(`Pokemon with term ${term} not found`);

        return pokemon;
    }

    async update(term: string, updatePokemonDto: UpdatePokemonDto) {
        const pokemon = await this.findOne(term);
        
        if(updatePokemonDto.name){
            updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
        }
        try {
            await pokemon.updateOne(updatePokemonDto, { new: true });
            
            return { ...pokemon.toJSON(), ...updatePokemonDto };
        } catch (error) {
            this.handleExpetions(error);
        }
    }

    async remove(id: string) {
        // const pokemon = await this.findOne(id);
        // await pokemon.deleteOne();
        const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
        if (deletedCount === 0) {
            throw new NotFoundException(`Pokemon with id ${id} not found`);
        }
        return { deleted: true };
    }


    private handleExpetions(error: any) {
        if (error.code === 11000) {
            throw new BadRequestException(`Pokemon with name ${ JSON.stringify( error.keyValue )} already exists`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Cant create pokemon-check logs`);
    }
}
