import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StudentCoverRepository } from '../../repository/user/student.cover.repository';
import { StudentRepository } from '../../repository/user/student.repository';
import { coverStorage } from '../../secure/storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentCoverDTO } from '../../dto/user/student.cover.dto';
import { StudentDTO } from '../../dto/user/student.dto';

@Controller('students/covers')
export class StudentCoverController {
  private bucket;

  constructor(
    private studentCoverRepository: StudentCoverRepository,
    private studentRepository: StudentRepository
  ) {
    this.bucket = coverStorage();
  }
  private async checkFileExists(fileName: string): Promise<boolean> {
    const file = this.bucket.file(fileName);
    const [exists] = await file.exists();
    return exists;
  }
  // 비밀번호 찾기랑 초기화 로그인 로그아웃 회원가
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createOrUpdateCoverImg(
    @UploadedFile() file: Express.Multer.File,
    @Body('student_id') temp: string
  ) {
    try {
      const fileName = `student_cover/${Date.now()}_ ${file.originalname}`;
      const fileUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;
      const blob = this.bucket.file(fileName);
      const blobStream = await blob.createWriteStream({ resumable: false });
      blobStream.on('error', (error) => {
        return error;
      });
      blobStream.on('finish', () => {});
      await blobStream.end(file.buffer);

      const student = await this.studentRepository.findById(temp);
      console.log(student);
      const studentCoverDTO: StudentCoverDTO = {
        file_name: fileName,
        file_url: fileUrl,
        student: student,
      };
      console.log(studentCoverDTO);
      if (student?.studentCover !== null) {
        const fileExists = await this.checkFileExists(student?.studentCover?.file_name!);
        if (fileExists) {
          await this.bucket.file(student?.studentCover?.file_name!).delete();
          const updateStudentCover = await this.studentCoverRepository.update(
            student?.studentCover?.file_name!,
            studentCoverDTO
          );
          return updateStudentCover;
        }
      }
      const createStudentCover = await this.studentCoverRepository.create(studentCoverDTO);
      return createStudentCover;
    } catch (error) {
      return error;
    }
  }
  //   @Delete(':fileName')
  //   async deleteCoverImg(@Param('fileName') fileName: string) {
  //     try {
  //       console.log(fileName);
  //       await this.studentCoverRepository.deleteStudentCover(fileName); // 비동기적으로 실행
  //       await this.bucket.file(fileName).delete();
  //       return this.studentCoverRepository.deleteStudentCover(fileName);
  //     } catch (error) {
  //       return error;
  //     }
  //   }
  //   @Get()
  //   async getByCoverName(@Param('fileName') fileName: string) {
  //     try {
  //       return await this.studentCoverRepository.findbyCoverName(fileName);
  //     } catch (error) {
  //       return error;
  //     }
  //   }
}
