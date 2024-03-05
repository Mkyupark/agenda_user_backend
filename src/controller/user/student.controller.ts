import { Student } from '../../entities/student.entity';
import { StudentDTO } from '../../dto/student.dto';

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
import { StudentRepository } from '../../repository/student.repository';
import { auth } from '../../configs/config';
import { Response } from 'express';
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
} = require('firebase/auth');
//  await sendEmailVerification(newUser.user);
//create시 userCredential user 리턴
// update
// 초기화
// 로그인 user
// 로그아웃 user
@Controller('students')
export class studentController {
  constructor(private studentRepository: StudentRepository) {}
  // 비밀번호 찾기랑 초기화 로그인 로그아웃 회원가
  @Post() //ok
  async createStudent(@Body() studentDTO: StudentDTO, @Res() res: Response) {
    try {
      const createdStudent = await this.studentRepository.createOrUpdateStudent(studentDTO);
      return res.status(HttpStatus.CREATED).json(createdStudent);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Put()
  async updateStudent(@Body() studentDTO: StudentDTO) {
    try {
    } catch (error) {
      return error;
    }
  }
  @Delete(':id')
  async DeleteStudent(@Param('id') id: string, @Res() res: Response) {
    try {
      const student = await this.studentRepository.deleteStudentById(id);
      return res.status(HttpStatus.OK).json(student);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Get()
  async findOneStudent(@Param('id') id: string, @Res() res: Response) {
    try {
      const student = await this.studentRepository.findStudentById(id);
      if (!student) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Student Not Found' });
      }
      console.log(student);
      return res.status(HttpStatus.OK).json(student);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  @Get('login') //ok
  async Login(@Param('id') id: string, @Res() res: Response) {
    try {
      const student = await this.studentRepository.findStudentById(id);
      if (!student) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Student Not Found' });
      }
      return res.status(HttpStatus.OK).json(student);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
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
