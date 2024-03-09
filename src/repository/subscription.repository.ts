import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionDTO } from '../dto/subscription.dto';
import { Subscription } from '../entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectRepository(Subscription)
    private readonly repository: Repository<SubscriptionDTO>
  ) {}

  async createOrUpdate(subscriptionDTO: SubscriptionDTO) {
    return await this.repository.save(subscriptionDTO);
  }
  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['student', 'course'],
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
