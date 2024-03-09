import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { SubscriptionDTO } from '../dto/subscription.dto';
import { SubscriptionRepository } from '../repository/subscription.repository';
import { StudentRepository } from '../repository/user/student.repository';
import { CourseRepository } from '../repository/course/course.repository';

@Controller('api')
export class SubscriptionController {
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private studentRepository: StudentRepository,
    private courseRepository: CourseRepository
  ) {}

  @Post()
  async createOrUpdateSubscription(@Body() subscriptionDTO: SubscriptionDTO, @Res() res: Response) {
    try {
      const student = await this.studentRepository.findById(subscriptionDTO.student_id!);
      const course = await this.courseRepository.findById(subscriptionDTO.course_id!);
      console.log(student);
      console.log(course);
      subscriptionDTO = {
        student: student!,
        course: course!,
      };
      const createSubscription = await this.subscriptionRepository.createOrUpdate(subscriptionDTO);
      return res.status(HttpStatus.CREATED).json(createSubscription);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  @Delete()
  async DeleteSubscription(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.subscriptionRepository.deleteById(id);
      return res.status(HttpStatus.OK).json({ message: 'subscription delete ok' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  // 특정 강의 정보 조회, 특정 강의의 id
  @Get()
  async findOneSubscription(@Query('id') id: string, @Res() res: Response) {
    console.log(id);
    try {
      const subscription = await this.subscriptionRepository.findById(id);
      console.log(id);
      console.log(subscription);
      if (!subscription) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Institution Not Found' });
      }
      console.log(subscription);
      return res.status(HttpStatus.OK).json(subscription);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  // 특정 학생의 구독 정보 모두 조회, 학생의 id
  @Get('subscriptions')
  async findSubscriptionsByStudentId(@Query('id') id: string, @Res() res: Response) {
    try {
      const student = await this.studentRepository.findById(id);
      if (!student) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Student not found' });
      }

      const subscriptions = await this.subscriptionRepository.findSubscriptionsByStudent(id);
      if (subscriptions.length === 0) {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'No subscriptions found for the student' });
      }

      return res.status(HttpStatus.OK).json(subscriptions);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  // 특정 학생의 카트 정보 모두 조회, 학생의 id
  @Get('carts')
  async findCartbyStudents(@Query('id') id: string, @Res() res: Response) {
    try {
      const student = await this.studentRepository.findById(id);
      if (student === null) {
        return res.status(HttpStatus.OK).json({ message: '학생 정보 없음' });
      }
      const temp = await this.subscriptionRepository.findCartByStudent(student);
      return res.status(HttpStatus.OK).json(temp);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
}
