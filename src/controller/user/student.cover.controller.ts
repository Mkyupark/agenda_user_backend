import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StudentCoverRepository } from '../../repository/student.cover.repository';
import { StudentRepository } from '../../repository/student.repository';
import { coverStorage } from '../../secure/storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentCoverDTO } from '../../dto/student.cover.dto';
import { StudentDTO } from '../../dto/student.dto';

@Controller('studentcovers')
export class StudentCoverController {
  private bucket;

  constructor(
    private studentCoverRepository: StudentCoverRepository,
    private studentRepository: StudentRepository
  ) {
    this.bucket = coverStorage();
  }
  // 비밀번호 찾기랑 초기화 로그인 로그아웃 회원가
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createOrUpdateCoverImg(
    @UploadedFile() file: Express.Multer.File,
    @Body('student_id') temp: string
  ) {
    try {
      const fileName = `student_img/${Date.now()}_ ${file.originalname}`;
      const fileUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;
      const blob = this.bucket.file(fileName);
      const blobStream = await blob.createWriteStream({ resumable: false });
      blobStream.on('error', (error) => {
        return error;
      });
      blobStream.on('finish', () => {});
      await blobStream.end(file.buffer);

      const student = await this.studentRepository.findStudentById(temp);
      const studentCoverDTO: StudentCoverDTO = {
        file_name: fileName,
        file_url: fileUrl,
        student: student,
      };
      const createdStudentCover =
        await this.studentCoverRepository.createStudentCover(studentCoverDTO);
      student!.studentCover = createdStudentCover;
      console.log(createdStudentCover);
      const studentDTO: StudentDTO = { ...student, studentCover: studentCoverDTO };
      const updateStudent = await this.studentRepository.createOrUpdateStudent(studentDTO);
      console.log(updateStudent);

      return studentDTO;
    } catch (error) {
      return error;
    }
  }
  @Delete(':fileName')
  async deleteCoverImg(@Param('fileName') fileName: string) {
    try {
      console.log(fileName);
      await this.studentCoverRepository.deleteStudentCover(fileName); // 비동기적으로 실행
      await this.bucket.file(fileName).delete();
      return this.studentCoverRepository.deleteStudentCover(fileName);
    } catch (error) {
      return error;
    }
  }
  @Get()
  async getByCoverName(@Param('fileName') fileName: string) {
    try {
      return await this.studentCoverRepository.findbyCoverName(fileName);
    } catch (error) {
      return error;
    }
  }
}
