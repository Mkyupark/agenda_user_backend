import { Student } from '../../entities/student.entity';
import { StudentDTO } from '../../dto/student.dto';
import { StudentService } from '../../service/student.service';
import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
//  await sendEmailVerification(newUser.user);
//create시 userCredential user 리턴
// update
// 초기화
// 로그인 user
// 로그아웃 user
@Controller('students')
export class studentController {
  constructor(private studentService: StudentService) {}
  // 비밀번호 찾기랑 초기화 로그인 로그아웃 회원가
  @Post()
  async createStudent(@Body() studentDTO: Student) {
    try {
      const userCredential = await this.studentService.createStudent(studentDTO);
      this.studentService.createStudent(studentDTO);
      console.log(userCredential);
      return userCredential;
    } catch (error) {
      return error;
    }
  }
}
