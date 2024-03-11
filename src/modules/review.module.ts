import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from '../controller/review.controller';
import { Course } from '../entities/course/course.entity';
import { Review } from '../entities/review.entity';
import { Subscription } from '../entities/subscription.entity';
import { Student } from '../entities/user/student.entity';
import { CourseRepository } from '../repository/course/course.repository';
import { ReviewRepository } from '../repository/review/review.repository';
import { SubscriptionRepository } from '../repository/subscription.repository';
import { StudentRepository } from '../repository/user/student.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Review, Student, Course, Subscription]), // Student를 포함하여 TypeOrmModule 설정
  ],
  controllers: [ReviewController],
  providers: [ReviewRepository, StudentRepository, CourseRepository, SubscriptionRepository], // StudentRepository를 providers에 추가
})
export class reviewModule {}
