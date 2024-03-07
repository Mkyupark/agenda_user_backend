import { StudentDTO } from '../../dto/user/student.dto';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { StudentRepository } from '../../repository/user/student.repository';
import { Response } from 'express';
import { coverStorage } from '../../secure/storage';

@Controller('students')
export class studentController {
  private bucket;
  constructor(private studentRepository: StudentRepository) {
    this.bucket = coverStorage();
  }
  // 비밀번호 찾기랑 초기화 로그인 로그아웃 회원가
  @Post() //ok
  async createStudent(@Body() studentDTO: StudentDTO, @Res() res: Response) {
    try {
      const createdStudent = await this.studentRepository.createOrUpdate(studentDTO);
      return res.status(HttpStatus.CREATED).json(createdStudent);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Delete()
  async DeleteStudent(@Param('id') id: string, @Res() res: Response) {
    try {
      const student = await this.studentRepository.findById(id);
      const fileName = student?.studentCover?.file_name;
      if (fileName) {
        await this.bucket.file(fileName!).delete();
      }
      await this.studentRepository.deleteById(id);
      return res.status(HttpStatus.OK).json(student);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Get()
  async findOneStudent(@Param('id') id: string, @Res() res: Response) {
    try {
      const student = await this.studentRepository.findById(id);
      if (!student) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Student Not Found' });
      }
      console.log(student);
      return res.status(HttpStatus.OK).json(student);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  // @Get('login') //ok
  // async Login(@Param('id') id: string, @Res() res: Response) {
  //   try {
  //     const student = await this.studentRepository.findById(id);
  //     if (!student) {
  //       return res.status(HttpStatus.NOT_FOUND).json({ message: 'Student Not Found' });
  //     }
  //     return res.status(HttpStatus.OK).json(student);
  //   } catch (error) {
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
  //   }
  // }
  // @Post('logout')
  // async LogOut() {
  //   try {
  //     const userCredential = await auth.currentUser;
  //     if (userCredential == null) {
  //       return '로그인 상태가 아님';
  //     }
  //     await signOut(auth);
  //     return '로그아웃 완료';
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
