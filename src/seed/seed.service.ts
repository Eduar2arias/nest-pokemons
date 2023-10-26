import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios'
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private axios:AxiosInstance = axios
  async excecuteSEED(){
    const { data  } = await this.axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20")
    
    data.results.forEach( ({ name , url})=> {
      let segmento = url.split('/')
      let No:number = Number(segmento[segmento.length - 2])
      console.log(No);

       
    })
    return data
  }
}
