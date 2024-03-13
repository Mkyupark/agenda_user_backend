import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
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

  // 삽입 수정 둘다 되는데, 오래걸림
  @Post()
  async createSubscription(@Body() subscriptionDTO: SubscriptionDTO, @Res() res: Response) {
    try {
      const student = await this.studentRepository.findById(subscriptionDTO.student_id!);
      const course = await this.courseRepository.findById(subscriptionDTO.course_id!);
      if (!student || !course) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: '학생이나 강의 정보 없음. 생성 불가' });
      }
      subscriptionDTO = {
        ...subscriptionDTO,
        student: student!,
        course: course!,
      };
      const createSubscription = await this.subscriptionRepository.createOrUpdate(subscriptionDTO);
      return res.status(HttpStatus.CREATED).json(createSubscription);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  // 수정시
  @Put()
  async updateSubscription(@Body() subscriptionDTO: SubscriptionDTO, @Res() res: Response) {
    try {
      const subscription = await this.subscriptionRepository.findById(subscriptionDTO.id!);
      if (!subscription) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: '정보 없어서 수정 불가' });
      }
      const result = await this.subscriptionRepository.createOrUpdate(subscriptionDTO);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  // 강의 구매시 id 넘겨주기
  @Put('buy')
  async purchaseCourse(@Query('id') id: string) {
    const temp = await this.subscriptionRepository.purchaseSubscription(id);
    console.log(temp);
    return;
  }
  // 삭제시
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
      const subscriptions = await this.subscriptionRepository.findSubscriptionsByStudent(id);
      console.log(subscriptions);
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
      const temp = await this.subscriptionRepository.findCartByStudent(id);
      return res.status(HttpStatus.OK).json(temp);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Get('students')
  async findStudentbySubscription(@Query('institution_id') id: string) {
    return await this.subscriptionRepository.findStudentByInstitutionId(id);
  }
}
