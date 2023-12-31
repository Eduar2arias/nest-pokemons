import { IsInt, IsPositive, IsString, Min, MinLength, minLength } from 'class-validator'

export class CreatePokemonDto {
    @IsString()
    @MinLength(1)
    name:string

    @IsInt()
    @IsPositive()
    @Min(1)
    No:number
}
