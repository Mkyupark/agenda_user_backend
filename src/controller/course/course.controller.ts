import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { InstitutionRepository } from '../../repository/user/institution.repository';
import { CourseDTO } from '../../dto/course/course.dto';
import { CourseRepository } from '../../repository/course/course.repository';
import { coverStorage } from '../../secure/storage';

@Controller('courses')
export class CourseController {
  private bucket;
  constructor(
    private courseRepository: CourseRepository,
    private institutionRepository: InstitutionRepository
  ) {
    this.bucket = coverStorage();
  }
  @Post()
  async createOrUpdateCourse(@Body() courseDTO: CourseDTO, @Res() res: Response) {
    try {
      // 수정
      if (courseDTO.id) {
        const is_exist = await this.courseRepository.findById(courseDTO.id!);
        if (is_exist !== null && courseDTO.institution_id === is_exist.institution?.id) {
          await this.courseRepository.createOrUpdate(courseDTO);
          return res.status(HttpStatus.CREATED).json({ message: 'course 수정' });
        }
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'course 수정 권한 없음' });
      }
      // 생성
      if (!courseDTO.institution_id) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'course 생성 권한 없음' });
      }
      const institution = await this.institutionRepository.insertByCourse(
        courseDTO.institution_id!
      );

      courseDTO = {
        ...courseDTO,
        institution: institution!,
      };
      console.log(courseDTO);
      await this.courseRepository.createOrUpdate(courseDTO);
      return res.status(HttpStatus.CREATED).json({ message: 'course 생성' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Delete()
  async DeleteCourse(
    @Query('id') id: string,
    @Query('institution_id') institution_id: string,
    @Res() res: Response
  ) {
    try {
      const course = await this.courseRepository.findById(id);
      const fileName = course?.courseCover?.file_name;
      if (fileName) {
        await this.bucket.file(fileName!).delete();
      }
      const is_delete = await this.courseRepository.deleteById(id, institution_id);
      return res.status(HttpStatus.OK).json();
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Get()
  async findOneCourse(@Query('id') id: string, @Res() res: Response) {
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
