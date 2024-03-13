import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileDataDTO } from '../../dto/course/file.data.dto';
import { FileData } from '../../entities/user/coverImg.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseFileDataRepository {
  constructor(
    @InjectRepository(FileData)
    private readonly repository: Repository<FileDataDTO>
  ) {}
  // 삽입
  async create(fileDataDTO: FileDataDTO) {
    return await this.repository.save(fileDataDTO);
  }
  // 삭제
  async deleteById(fileName: string) {
    return await this.repository.delete({ file_name: fileName });
  }

  async getAllByCourseId(id: string) {
    return await this.repository.find({
      where: {
        course: { id: id },
      },
    });
  }
  async getFileNamesByCourseId(id: string) {
    const fileNames = await this.repository
      .createQueryBuilder('file_data')
      .leftJoinAndSelect('file_data.course', 'course')
      .where('course.id = :course_id', { id })
      .select(['file_name'])
      .getRawMany();
    return fileNames;
  }
  // courseId로 삭제
  async deleteAllByCourseId(id: string) {
    return await this.repository.delete({ course: { id: id } });
  }
}
