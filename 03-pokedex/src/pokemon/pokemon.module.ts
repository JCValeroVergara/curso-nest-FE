import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [PokemonController],
    providers: [PokemonService],
    imports: [
        ConfigModule,
        MongooseModule.forFeature([
            {
                name: Pokemon.name,
                schema: PokemonSchema,
            },
        ])
    ],
    exports: [MongooseModule]
})
export class PokemonModule {}
