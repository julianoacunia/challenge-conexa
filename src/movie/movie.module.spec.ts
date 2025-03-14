import { Test, TestingModule } from '@nestjs/testing';
import { MovieModule } from './movie.module';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('MovieModule', () => {
  let module: TestingModule;
  let movieService: MovieService;
  let movieController: MovieController;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [MovieModule],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    movieController = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
    expect(movieService).toBeDefined();
    expect(movieController).toBeDefined();
  });

  it('should import HttpModule and TypeOrmModule', () => {
    const httpModule = module.get(HttpModule);
    const typeOrmModule = module.get(TypeOrmModule);
    expect(httpModule).toBeDefined();
    expect(typeOrmModule).toBeDefined();
  });

  it('should return movie service and controller', () => {
    expect(movieService).toBeInstanceOf(MovieService);
    expect(movieController).toBeInstanceOf(MovieController);
  });
});
