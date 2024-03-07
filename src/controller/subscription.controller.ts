import { Body, Controller, Delete, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SubscriptionDTO } from 'src/dto/subscription.dto';
import { SubscriptionRepository } from 'src/repository/subscription.repository';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  @Post()
  async createOrUpdateSubscription(@Body() subscriptionDTO: SubscriptionDTO, @Res() res: Response) {
    try {
      const createSubscription = await this.subscriptionRepository.createOrUpdate(subscriptionDTO);
      return res.status(HttpStatus.CREATED).json(createSubscription);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Delete()
  async DeleteSubscription(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.subscriptionRepository.deleteById(id);
      return res.status(HttpStatus.OK).json({ message: 'subscription delete ok' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
}
