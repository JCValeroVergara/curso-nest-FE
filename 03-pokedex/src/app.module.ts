import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfig, JoiValidationsSchema } from './config';


@Module({
    imports: [
        ConfigModule.forRoot({
            load: [EnvConfig],
            validationSchema: JoiValidationsSchema,
        }),

        ServeStaticModule.forRoot({
            rootPath: join(__dirname,'..','public'),
        }),

        MongooseModule.forRoot(process.env.MONGODB),

        PokemonModule,

        CommonModule,

        SeedModule, 
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
