import { Controller, Request, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(@Body() body: CreateUserDto): Promise<{ token: string }> {
    return this.service.login(body);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto): Promise<{ token: string }> {
    return this.service.signup(body);
  }
}
