import { join } from 'path';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

// vatiables de entorno
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './common/config/env.config';

@Module({
  imports: [
    // variables de entorno !!
    ConfigModule.forRoot({
      load:[EnvConfiguration]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public')
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName:'pokemon'
    }),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor(){
   

  }
  
}
