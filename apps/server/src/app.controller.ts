import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health-check')
  getHealthStatus(): HealthStatus {
    return { status: 'ok', timestamp: Date.now() };
  }
}

interface HealthStatus {
  status: string;
  timestamp: number;
}
