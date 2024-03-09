import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CourseCover } from '../../entities/user/coverImg.entity';
import { Course } from '../../entities/course/course.entity';
import { CourseCoverContorller } from '../../controller/course/course.cover.controller';
import { CourseCoverRepository } from '../../repository/course/course.cover.repository';
import { CourseRepository } from '../../repository/course/course.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([CourseCover, Course]), // Student를 포함하여 TypeOrmModule 설정
  ],
  controllers: [CourseCoverContorller],
  providers: [CourseCoverRepository, CourseRepository], // StudentRepository를 providers에 추가
})
export class courseCoverModule {}
