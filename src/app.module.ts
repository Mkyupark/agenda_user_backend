import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.configs';
import { studentController } from './controller/user/student.controller';
import { StudentService } from './service/student.service';
import { StudentRepository } from './repository/student.repository';
import { studentModule } from './modules/student.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // 환경 변수 등을 로드하기 위해 ConfigModule을 임포트합니다.
    TypeOrmModule.forRoot(typeORMConfig), // TypeORM 설정을 로드합니다.
    studentModule,
  ],
})
export class AppModule {}
