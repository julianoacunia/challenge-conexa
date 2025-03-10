import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { SwapiService } from './swapi.service';
import { HttpModule } from '@nestjs/axios'; // Importa HttpModule


@Module({
  imports: [TypeOrmModule.forFeature([Movie]), HttpModule],
  controllers: [MovieController],
  providers: [MovieService, SwapiService],
  exports: [MovieService]
})
export class MovieModule {}
