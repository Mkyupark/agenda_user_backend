import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { FileDataDTO } from '../../dto/course/file.data.dto';
import { CourseFileDataRepository } from '../../repository/course/course.file.data.repository';
import { CourseRepository } from '../../repository/course/course.repository';
import { fileStorage } from '../../secure/storage';

@Controller('courses/files')
export class CourseFileDataController {
  private bucket;
  constructor(
    private courseRepository: CourseRepository,
    private courseFileDataRepository: CourseFileDataRepository
  ) {
    this.bucket = fileStorage();
  }
  // 생성
  @Post()
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('course_id') temp: string,
    @Res() res: Response
  ) {
    try {
      const fileName = `${Date.now()}_${file.originalname}`;
      const fileUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;

      const blob = this.bucket.file(fileName);
      const blobStream = await blob.createWriteStream({ resumable: false });
      blobStream.on('error', (error) => {
        return error;
      });
      blobStream.on('finish', () => {});

      const course = await this.courseRepository.findById(temp);
      const fileDataDTO: FileDataDTO = {
        file_name: fileName,
        file_url: fileUrl,
        course: course,
      };
      const fileDTO = await this.courseFileDataRepository.create(fileDataDTO);
      return res.status(HttpStatus.CREATED).json(fileDTO);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
  // courseId로 삭제
  @Get()
  async getAllByCourseId(@Query('course_id') id: string, @Res() res: Response) {
    try {
      const fileList = await this.courseFileDataRepository.getAllByCourseId(id);

      return res.status(HttpStatus.OK).json(fileList);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
  // 파일 이름으로 아이디로 삭제
  @Delete()
  async DeleteOneFileData(@Query('file_name') id: string, @Res() res: Response) {
    try {
      const deleteFile = await this.courseFileDataRepository.deleteById(id);
      return res.status(HttpStatus.OK).json({ message: '삭제 OK' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
