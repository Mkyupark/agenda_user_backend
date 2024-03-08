import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Subscription } from '../entities/subscription.entity';
import { SubscriptionController } from '../controller/subscription.controller';
import { StudentRepository } from '../repository/user/student.repository';
import { SubscriptionRepository } from '../repository/subscription.repository';
import { Student } from '../entities/user/student.entity';
import { Course } from '../entities/course/course.entity';
import { CourseRepository } from '../repository/course/course.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Subscription, Student, Course]), // Student를 포함하여 TypeOrmModule 설정
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionRepository, StudentRepository, CourseRepository], // StudentRepository를 providers에 추가
})
export class subscriptionModule {}
