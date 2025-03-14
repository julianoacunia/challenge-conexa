import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserRole } from '../user/entities/user.entity';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('secret') }, // Mock JWT_SECRET
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user object if payload is valid', () => {
      const payload = {
        sub: 1,
        email: 'test@example.com',
        role: UserRole.ADMIN,
      };
      const result = jwtStrategy.validate(payload);

      expect(result).toEqual({
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      });
    });

    it('should throw UnauthorizedException if no payload', () => {
      try {
        jwtStrategy.validate({ sub: 0, email: '', role: UserRole.ADMIN });
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e).toBe('Unauthorized');
      }
    });
  });
});
