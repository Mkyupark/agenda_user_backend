import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.configs';
import { studentModule } from './modules/user/student.module';
import { studentCoverModule } from './modules/user/student.cover.module';
import { instititutionCoverModule } from './modules/user/institution.cover.module';
import { institutionModule } from './modules/user/institution.module';
import { teacherModule } from './modules/user/teacher.module';
import { teachercoverModule } from './modules/user/teacher.cover.module';
import { courseModule } from './modules/course/course.module';
import { courseCoverModule } from './modules/course/course.cover.module';
import { subscriptionModule } from './modules/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // 환경 변수 등을 로드하기 위해 ConfigModule을 임포트합니다.
    TypeOrmModule.forRoot(typeORMConfig), // TypeORM 설정을 로드합니다.
    studentModule,
    studentCoverModule,
    institutionModule,
    instititutionCoverModule,
    teacherModule,
    teachercoverModule,
    courseModule,
    courseCoverModule,
    subscriptionModule,
  ],
})
export class AppModule {}
