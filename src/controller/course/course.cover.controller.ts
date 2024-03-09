import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { coverStorage } from '../../secure/storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseCoverRepository } from '../../repository/course/course.cover.repository';
import { CourseRepository } from '../../repository/course/course.repository';
import { CourseCoverDTO } from '../../dto/course/course.cover.dto';

@Controller('courses/covers')
export class CourseCoverContorller {
  private bucket;

  constructor(
    private courseCoverRepository: CourseCoverRepository,
    private courseRepository: CourseRepository
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
    @Body('course_id') temp: string
  ) {
    try {
      const fileName = `course_cover/${Date.now()}_ ${file.originalname}`;
      const fileUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;

      const blob = this.bucket.file(fileName);
      const blobStream = await blob.createWriteStream({ resumable: false });
      blobStream.on('error', (error) => {
        return error;
      });
      blobStream.on('finish', () => {});
      await blobStream.end(file.buffer);

      const course = await this.courseRepository.findById(temp);
      const courseCoverDTO: CourseCoverDTO = {
        file_name: fileName,
        file_url: fileUrl,
        course: course,
      };
      if (course?.courseCover !== null) {
        const fileExists = await this.checkFileExists(course?.courseCover?.file_name!);
        if (fileExists) {
          await this.bucket.file(course?.courseCover?.file_name!).delete();
        }
        const updateCourseCover = await this.courseCoverRepository.createOrUpdate(
          course?.courseCover?.file_name!,
          courseCoverDTO
        );
        return updateCourseCover;
      }
      const createCourseCover = await this.courseCoverRepository.create(courseCoverDTO);
      return createCourseCover;
    } catch (error) {
      return error;
    }
  }
}
