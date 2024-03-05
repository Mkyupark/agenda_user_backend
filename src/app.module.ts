import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.configs';
import { studentModule } from './modules/student.module';
import { studentCoverModule } from './modules/student.cover.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // 환경 변수 등을 로드하기 위해 ConfigModule을 임포트합니다.
    TypeOrmModule.forRoot(typeORMConfig), // TypeORM 설정을 로드합니다.
    studentModule,
    studentCoverModule,
  ],
})
export class AppModule {}
