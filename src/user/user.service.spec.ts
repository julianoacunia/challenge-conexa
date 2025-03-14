import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const repositoryMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException if email already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        password: 'password',
      };
      userRepository.findOne = jest.fn().mockResolvedValueOnce(createUserDto);

      try {
        await userService.create(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should create and save a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'newuser@test.com',
        password: 'password',
      };
      const savedUser = { ...createUserDto, id: 1 };
      userRepository.findOne = jest.fn().mockResolvedValueOnce(null);
      userRepository.create = jest.fn().mockReturnValue(savedUser);
      userRepository.save = jest.fn().mockResolvedValue(savedUser);

      const result = await userService.create(createUserDto);
      expect(result).toEqual(savedUser);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        password: 'password',
      };
      userRepository.findOne = jest.fn().mockResolvedValueOnce(createUserDto);

      const result = await userService.findByEmail('test@test.com');
      expect(result).toEqual(createUserDto);
    });
  });
});
