import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Course } from '../../entities/course/course.entity';
import { CourseController } from '../../controller/course/course.controller';
import { CourseRepository } from '../../repository/course/course.repository';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseRepository], // service 넣을꺼면 앞에다 넣어야함.
})
export class courseModule {}
