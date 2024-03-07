import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionDTO } from 'src/dto/subscription.dto';
import { Subscription } from 'src/entities/subscription.entity';
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
  async deleteById(id: string) {
    return await this.repository.delete(id);
  }
}
