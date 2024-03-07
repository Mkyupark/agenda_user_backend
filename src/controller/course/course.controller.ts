import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CourseDTO } from '../../dto/course/course.dto';
import { CourseRepository } from '../../repository/course/course.repository';
import { coverStorage } from '../../secure/storage';

@Controller('courses')
export class CourseController {
  private bucket;
  constructor(private courseRepository: CourseRepository) {
    this.bucket = coverStorage();
  }
  @Post()
  async createOrUpdateCourse(@Body() courseDTO: CourseDTO, @Res() res: Response) {
    try {
      const createCourse = await this.courseRepository.createOrUpdate(courseDTO);
      return res.status(HttpStatus.CREATED).json(createCourse);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Delete()
  async DeleteCourse(@Param('id') id: string, @Res() res: Response) {
    try {
      const course = await this.courseRepository.findById(id);
      const fileName = course?.courseCover?.file_name;
      if (fileName) {
        await this.bucket.file(fileName!).delete();
      }
      await this.courseRepository.deleteById(id);
      return res.status(HttpStatus.OK).json();
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Get()
  async findOneCourse(@Param('id') id: string, @Res() res: Response) {
    try {
      const course = await this.courseRepository.findById(id);
      if (!course) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Course Not Found' });
      }
      return res.status(HttpStatus.OK).json(course);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
}
