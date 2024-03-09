import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { institutionController } from '../../controller/user/institution.controller';
import { InstitutionRepository } from '../../repository/user/institution.repository';
import { Institution } from '../../entities/user/institution.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Institution])],
  controllers: [institutionController],
  providers: [InstitutionRepository], // service 넣을꺼면 앞에다 넣어야함.
})
export class institutionModule {}
