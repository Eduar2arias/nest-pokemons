import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    // console.log(createPokemonDto);
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      console.log(error);
     this.handleExceptions(error)
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    try {
      let pokemon: Pokemon;
      if (!isNaN(Number(term))) {
        console.log('entro');
        pokemon = await this.pokemonModel.findOne({ No: term });
      }

      if (!pokemon && isValidObjectId(term)) {
        pokemon = await this.pokemonModel.findById(term);
      }
      

      if (!pokemon) {
        pokemon = await this.pokemonModel.findOne({ name: term });
      }
      if (pokemon?._id) return pokemon;
      throw new Error(`No se puede encontrar pokemon con ese id ${term}`);
    } catch (error) {
      console.log(error.message);

      throw new BadRequestException(error.message);
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.findOne(term);
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error)
    }
    // return `This action updates a #${id} pokemon`;
  }

  async remove(id: string) {

    // const pokemon = await this.findOne( id) 
    // const result = await pokemon.deleteOne()
    // todo para realizar una sola consulta
    const result = await this.pokemonModel.deleteOne({_id:id})
    console.log(result);

    if ( result.deletedCount === 0) throw new BadRequestException(`pokemon with id "${id} not found`)
    
    return ' pokemon con el id '+ id + 'removido con exito'
    
  }

  private handleExceptions(error :any){
    if (error.code === 11000)
        throw new BadRequestException(
          `pokemon existe in data base ${JSON.stringify(error.keyValue)}`,
        );
      throw new ForbiddenException('cant create pokemon - Check server log');
  }
}
