import { Student } from '../../entities/student.entity';
import { StudentDTO } from '../../dto/student.dto';

import { Body, Controller, Delete, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { StudentRepository } from '../../repository/student.repository';
import { auth } from '../../configs/config';
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
  async createStudent(@Body() studentDTO: StudentDTO) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        studentDTO.email,
        studentDTO.password
      );
      // fb 키 저장
      studentDTO.id = userCredential.user.uid;
      await this.studentRepository.createStudent(studentDTO);
      console.log(userCredential.user);
      return userCredential.user;
    } catch (error) {
      return error;
    }
  }
  @Post('login') //ok
  async Login(@Body() studentDTO: StudentDTO) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        studentDTO.email,
        studentDTO.password
      );
      const temp = await this.studentRepository.findStudentById(userCredential.user.uid);
      console.log(temp);
      return userCredential.user;
    } catch (error) {
      return error;
    }
  }
  @Post('logout')
  async LogOut() {
    try {
      const userCredential = await auth.currentUser;
      if (userCredential == null) {
        return '로그인 상태가 아님';
      }
      await signOut(auth);
      return '로그아웃 완료';
    } catch (error) {
      return error;
    }
  }
  @Delete()
  async DeleteStudent() {
    try {
      const user = auth.currentUser;
      if (!user) {
        return '로그인 상태 아님';
      }
      await deleteUser(user);
      await this.studentRepository.deleteStudentById(user.uid);
      return '회원 탈퇴 완료';
    } catch (error) {
      return error;
    }
  }
}
