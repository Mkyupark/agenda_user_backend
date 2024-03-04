import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { configDotenv } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(app);
  const configService = app.get(ConfigService);
  const port = configService.get('BACKEND_PORT') || 8080; // 환경변수나 .env 파일에서 포트를 가져옵니다.

  await app.listen(port);
  console.log(`🚀 서버가 ${port}번 포트에서 실행중입니다.`);
}
bootstrap();
