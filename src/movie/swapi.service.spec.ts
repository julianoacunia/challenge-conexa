import { Test, TestingModule } from '@nestjs/testing';
import { SwapiService } from './swapi.service';
import { MovieService } from './movie.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('SwapiService', () => {
  let service: SwapiService;

  beforeEach(async () => {
    const movieServiceMock = {
      create: jest.fn(),
    };

    const httpServiceMock = {
      get: jest.fn(() =>
        of({
          data: {
            results: [
              {
                title: 'Movie 1',
                director: 'Director 1',
                release_date: '1977-05-25',
                opening_crawl: 'A long time ago...',
              },
            ],
          },
        }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwapiService,
        { provide: MovieService, useValue: movieServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get<SwapiService>(SwapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
