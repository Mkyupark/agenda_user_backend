import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewDTO } from '../../dto/review.dto';
import { Review } from '../../entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<ReviewDTO>
  ) {}

  async create(reviewDTO: ReviewDTO) {
    return await this.repository.save(reviewDTO);
  }
  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id: id,
      },
    });
  }
  async findAll(course_id: string) {
    return await this.repository.find({
      where: {
        course: { id: course_id },
      },
    });
  }
  async getCourseRate(course_id: string) {
    const rates = await this.repository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.course', 'course')
      .where('course.id = :course_id', { course_id })
      .select(['rate'])
      .getRawMany();
    const ratesValues = rates.map((row) => parseFloat(row.rate));
    const sum = ratesValues.reduce((total, rate) => total + rate, 0);
    const averRate = sum / rates.length;
    return averRate;
  }
}
