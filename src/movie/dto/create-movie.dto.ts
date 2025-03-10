import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  director?: string;

  @IsOptional()
  @IsInt()
  releaseYear?: number;

  @IsOptional()
  synopsis?: string;
}
