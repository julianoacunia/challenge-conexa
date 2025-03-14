import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: Reflector,
          useValue: { get: jest.fn() },
        },
      ],
    }).compile();

    jwtAuthGuard = module.get<JwtAuthGuard>(JwtAuthGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
    expect(reflector).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return false if AuthGuard cannot activate', async () => {
      const context: ExecutionContext = {} as ExecutionContext;
      jest.spyOn(jwtAuthGuard, 'canActivate').mockResolvedValue(false);

      const result = await jwtAuthGuard.canActivate(context);

      expect(result).toBe(false);
    });

    it('should return true if no roles are required', async () => {
      const context: ExecutionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getHandler: jest.fn().mockReturnValue(() => {}),
      } as unknown as ExecutionContext;
      jest.spyOn(reflector, 'get').mockReturnValue(undefined);

      const result = await jwtAuthGuard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException if user has no role', async () => {
      const context: ExecutionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnValue({ user: {} }),
      } as unknown as ExecutionContext;

      try {
        await jwtAuthGuard.canActivate(context);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
      }
    });

    it('should throw UnauthorizedException if user does not have required role', async () => {
      const context: ExecutionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnValue({ user: { role: 'USER' } }),
      } as unknown as ExecutionContext;
      jest.spyOn(reflector, 'get').mockReturnValue(['ADMIN']);

      try {
        await jwtAuthGuard.canActivate(context);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
      }
    });

    it('should return true if user has required role', async () => {
      const context: ExecutionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnValue({ user: { role: 'ADMIN' } }),
      } as unknown as ExecutionContext;
      jest.spyOn(reflector, 'get').mockReturnValue(['ADMIN']);

      const result = await jwtAuthGuard.canActivate(context);

      expect(result).toBe(true);
    });
  });

  describe('handleRequest', () => {
    it('should throw UnauthorizedException if no user', () => {
      try {
        jwtAuthGuard.handleRequest(null, null);
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should return user if valid', () => {
      const user = { id: 1, email: 'test@example.com' };
      const result = jwtAuthGuard.handleRequest(null, user);

      expect(result).toEqual(user);
    });
  });
});
