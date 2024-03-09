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
  async findCartByStudent(id: string) {
    return await this.repository.find({
      where: {
        is_purchase: false,
        student: { id: id },
      },
      relations: ['course'],
    });
  }
  async findSubscriptionsByStudent(id: string) {
    return await this.repository.find({
      where: {
        is_purchase: true,
        student: { id: id },
      },
      relations: ['course'],
    });
  }
  async purchaseSubscription(id: string) {
    const cart = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    const subscriptionDTO: SubscriptionDTO = {
      ...cart,
      is_purchase: true,
    };
    return await this.repository.save(subscriptionDTO);
  }
  async findStudentByInstitutionId(institution_id: string) {
    const queryBuilder = this.repository.createQueryBuilder('course');
    const students = await this.repository
      .createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.student', 'student')
      .leftJoinAndSelect('student.studentCover', 'studentCover')
      .leftJoinAndSelect('subscription.course', 'course')
      .leftJoinAndSelect('course.institution', 'institution')
      .where('institution.id = :institution_id', { institution_id })
      .select(['student', 'studentCover']) // 선택할 속성 지정
      .distinct(true) // 중복된 값을 제거
      .getRawMany();

    console.log(students);
    return students;
    // return await this.repository.find({
    //   select: ['student'],
    //   where: {
    //     id: id,
    //     institution: {
    //       id: institution_id,
    //     },
    //   },
    // }).distinct;
  }
  async deleteById(id: string) {
    return await this.repository.delete(id);
  }
}
