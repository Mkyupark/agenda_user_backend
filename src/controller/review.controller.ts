import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReviewDTO } from '../dto/review.dto';
import { CourseRepository } from '../repository/course/course.repository';
import { ReviewRepository } from '../repository/review/review.repository';
import { SubscriptionRepository } from '../repository/subscription.repository';
import { StudentRepository } from '../repository/user/student.repository';

@Controller('api/reviews')
export class ReviewController {
  constructor(
    private reviewRepository: ReviewRepository,
    private studentRepository: StudentRepository,
    private subscriptionRepository: SubscriptionRepository,
    private courseRepository: CourseRepository
  ) {}

  //리뷰 등록
  @Post()
  async createReview(@Body() reviewDTO: ReviewDTO, @Res() res: Response) {
    try {
      const is_review = await this.subscriptionRepository.isReview(reviewDTO.subscription_id);
      if (!is_review) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: '리뷰 작성 불가능' });
      }

      const student = await this.studentRepository.findById(reviewDTO.student_id!);
      const course = await this.courseRepository.findById(reviewDTO.course_id!);
      if (!student || !course) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: '학생이나 강의 정보 없음. 생성 불가' });
      }

      reviewDTO = { ...reviewDTO, student: student, course: course };
      const create = await this.reviewRepository.create(reviewDTO);
      return res.status(HttpStatus.CREATED).json(create);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  // 리뷰 조회
  @Get()
  async getReview(@Query('course_id') course_id: string, @Res() res: Response) {
    try {
      const course = await this.courseRepository.findById(course_id!);
      if (!course) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: '강의 정보 없음' });
      }
      const reviews = await this.reviewRepository.findAll(course_id!);
      return res.status(HttpStatus.OK).json(reviews);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
  // course 평균 조회
  @Get('courserate')
  async getCoursesRate(@Query('course_id') course_id: string, @Res() res: Response) {
    try {
      const averrate = await this.reviewRepository.getCourseRate(course_id);
      const roundedAverrate = Number(averrate.toFixed(2));
      return res.status(HttpStatus.OK).json(roundedAverrate);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
