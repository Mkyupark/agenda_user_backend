import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { coverStorage } from '../../secure/storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeacherCoverRepository } from '../../repository/user/teacher.cover.repository';
import { TeacherRepository } from '../../repository/user/teacher.repository';
import { TeacherCoverDTO } from 'src/dto/user/teacher.cover.dto';

@Controller('teachers/covers')
export class TeacherCoverController {
  private bucket;

  constructor(
    private teacherCoverRepository: TeacherCoverRepository,
    private teacherRepository: TeacherRepository
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
    @Body('teacher_id') temp: string
  ) {
    try {
      const fileName = `teacher_cover/${Date.now()}_ ${file.originalname}`;
      const fileUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;
      const blob = this.bucket.file(fileName);
      const blobStream = await blob.createWriteStream({ resumable: false });
      blobStream.on('error', (error) => {
        return error;
      });
      blobStream.on('finish', () => {});
      await blobStream.end(file.buffer);

      const teacher = await this.teacherRepository.findById(temp);
      const teacherCoverDTO: TeacherCoverDTO = {
        file_name: fileName,
        file_url: fileUrl,
        teacher: teacher,
      };
      if (teacher?.teacherCover !== null) {
        const fileExists = await this.checkFileExists(teacher?.teacherCover?.file_name!);
        if (fileExists) {
          await this.bucket.file(teacher?.teacherCover?.file_name!).delete();
          const updateTeacherCover = await this.teacherCoverRepository.update(
            teacher?.teacherCover?.file_name!,
            teacherCoverDTO
          );
          return updateTeacherCover;
        }
      }
      const createTeacherCover = await this.teacherCoverRepository.create(teacherCoverDTO);
      return createTeacherCover;
    } catch (error) {
      return error;
    }
  }
}
