import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User, UserRole } from '../user/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn().mockResolvedValue(Promise.resolve('token')),
          },
        },
        { provide: UserService, useValue: { create: jest.fn() } },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign up a user', async () => {
    const user: User = {
      id: 1,
      email: 'test@test.com',
      password: '123',
      role: UserRole.ADMIN,
      hashPassword: jest.fn(),
    };
    jest.spyOn(userService, 'create').mockResolvedValue(user);
    await expect(controller.signUp(user)).resolves.toBe(user);
  });

  it('should login a user', async () => {
    const user: User = {
      id: 1,
      email: 'test@test.com',
      password: '123',
      role: UserRole.ADMIN,
      hashPassword: jest.fn(),
    };
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
    await expect(
      controller.login({ email: user.email, password: user.password }),
    ).resolves.toBe('token');
  });
});
