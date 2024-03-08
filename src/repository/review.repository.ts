import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewDTO } from 'src/dto/review.dto';
import { Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<ReviewDTO>
  ) {}

  async createOrUpdate(reviewDTO: ReviewDTO) {
    return await this.repository.save(reviewDTO);
  }
  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id: id,
      },
    });
  }
  async findCartByStudent(student: any) {
    return await this.repository.find({
      where: {
        is_purchase: false,
        student: { id: student.id },
      },
      relations: ['course'],
    });
  }
  async findSubscriptionsByStudent(student: any) {
    return await this.repository.find({
      where: {
        is_purchase: true,
        student: { id: student.id },
      },
      relations: ['course', 'courseCover'],
    });
  }
  async deleteById(id: string) {
    return await this.repository.delete(id);
  }
}
