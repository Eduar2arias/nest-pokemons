import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios'
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  private axios:AxiosInstance = axios
  constructor( @InjectModel(Pokemon.name) private readonly pokemonModel:Model<Pokemon> ,
              private http: AxiosAdapter
            ){

  }
  async excecuteSEED(){
    const { data  } = await this.axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=620")
    
    await this.pokemonModel.deleteMany({})
    
    let pokmeons = data.results.map( ({ name , url})=> {
      let segmento = url.split('/')
      let No:number = Number(segmento[segmento.length - 2])
      return {
        name ,
        No
      }
       
    })
    await this.pokemonModel.insertMany(pokmeons)

    
    return 'seed excecuted'
  }

  
  // ejecutando la forma adapter
  async excecutedSEEDAdapter(){
    
    await this.pokemonModel.deleteMany({})
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=620')

    let pokmeons = data.results.map( ({ name , url})=> {
      let segmento = url.split('/')
      let No:number = Number(segmento[segmento.length - 2])
      return {
        name ,
        No
      }
       
    })
    await this.pokemonModel.insertMany(pokmeons)

    
    return 'seed excecuted'
  }


}
