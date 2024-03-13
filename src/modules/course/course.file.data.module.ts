import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseFileDataController } from '../../controller/course/course.file.data';
import { Course } from '../../entities/course/course.entity';
import { FileData } from '../../entities/user/coverImg.entity';
import { CourseFileDataRepository } from '../../repository/course/course.file.data.repository';
import { CourseRepository } from '../../repository/course/course.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([FileData, Course]), // Student를 포함하여 TypeOrmModule 설정
  ],
  controllers: [CourseFileDataController],
  providers: [CourseRepository, CourseFileDataRepository], // StudentRepository를 providers에 추가
})
export class courseCoverModule {}
