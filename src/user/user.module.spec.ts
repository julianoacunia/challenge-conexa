import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UserModule', () => {
  let module: TestingModule;
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const userRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    module = await Test.createTestingModule({
      imports: [UserModule],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user service', () => {
    expect(userService).toBeInstanceOf(UserService);
  });
});