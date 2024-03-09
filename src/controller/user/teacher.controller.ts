import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { coverStorage } from '../../secure/storage';
import { TeacherRepository } from '../../repository/user/teacher.repository';
import { TeacherDTO } from '../../dto/user/teacher.dto';
import { InstitutionRepository } from '../../repository/user/institution.repository';

@Controller('teachers')
export class TeacherController {
  private bucket;
  constructor(private teacherRepository: TeacherRepository) {
    this.bucket = coverStorage();
  }
  // 비밀번호 찾기랑 초기화 로그인 로그아웃 회원가
  @Post() //ok
  async createOrUpdateTeacher(@Body() teacherDTO: TeacherDTO, @Res() res: Response) {
    try {
      const createTeacher = await this.teacherRepository.createOrUpdate(teacherDTO);
      return res.status(HttpStatus.CREATED).json(createTeacher);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Delete()
  async DeleteTeacher(@Param('id') id: string, @Res() res: Response) {
    try {
      const teacher = await this.teacherRepository.findById(id);
      const fileName = teacher?.teacherCover?.file_name;
      await this.bucket.file(fileName!).delete();
      await this.teacherRepository.deleteById(id);
      return res.status(HttpStatus.OK).json(teacher);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Get()
  async findOneTeacher(@Param('id') id: string, @Res() res: Response) {
    try {
      const teacher = await this.teacherRepository.findById(id);
      if (!teacher) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Teacher Not Found' });
      }
      console.log(teacher);
      return res.status(HttpStatus.OK).json(teacher);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Get('findByinsitution')
  async findByInstitution(@Param('insititution_id') id: string) {
    try {
      return await this.teacherRepository.findByInstitution(id);
    } catch (error) {
      return error;
    }
  }
}
