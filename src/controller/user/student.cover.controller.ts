import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StudentCoverRepository } from '../../repository/student.cover.repository';
import { coverStorage } from '../../secure/storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentCoverDTO } from 'src/dto/student.cover.dto';
import { auth } from '../../configs/config';

@Controller('studentcovers')
export class StudentCoverController {
  private bucket;
  constructor(private studentCoverRepository: StudentCoverRepository) {
    this.bucket = coverStorage();
  }
  // 비밀번호 찾기랑 초기화 로그인 로그아웃 회원가
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createCoverImg(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log(file.originalname);

      const fileName = `student_img/${Date.now()}_ ${file.originalname}`;
      const fileUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;
      const blob = this.bucket.file(fileName);
      const blobStream = await blob.createWriteStream({ resumable: false });
      blobStream.on('error', (error) => {
        return error;
      });
      blobStream.on('finish', () => {});
      await blobStream.end(file.buffer);
      const studentCoverDTO: StudentCoverDTO = {
        student_id: auth.uid,
        file_name: fileName,
        file_url: fileUrl,
      };
      await this.studentCoverRepository.createStudentCover(studentCoverDTO);
      return await this.studentCoverRepository.createStudentCover(studentCoverDTO);
    } catch (error) {
      return error;
    }
  }
  @Delete()
  async deleteCoverImg(@Param('fileName') fileName: string) {
    try {
      await this.bucket.file(fileName).delete();
      return this.studentCoverRepository.deleteStudentCover(fileName);
    } catch (error) {
      return error;
    }
  }
}
