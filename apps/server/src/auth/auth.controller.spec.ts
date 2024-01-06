import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

interface AuthPayload {
  token: string;
}

describe('AuthController', () => {
  interface MockAuthService {
    login: jest.Mock<Promise<AuthPayload>>;
  }

  let mockAuthService: MockAuthService;
  let mockAuthPayload: AuthPayload;
  let controller: AuthController;

  beforeEach(async () => {
    mockAuthPayload = { token: 'token-abc123' };
    mockAuthService = {
      login: jest.fn().mockResolvedValue(mockAuthPayload),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('login', () => {
    it('calls service.login and returns correct response', async () => {
      const body = {
        email: 'lovelyme@hotmail.com',
        password: 'abc123',
      } as CreateUserDto;
      await controller.login(body);
      expect(await controller.login(body)).toBe(mockAuthPayload);
      expect(mockAuthService.login).toBeCalledWith(body);
    });
  });
});
