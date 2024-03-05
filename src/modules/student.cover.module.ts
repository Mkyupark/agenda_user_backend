import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentCover } from '../entities/coverImg.entity';
import { StudentCoverController } from '../controller/user/student.cover.controller';
import { StudentCoverRepository } from '../repository/student.cover.repository';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([StudentCover])],
  controllers: [StudentCoverController],
  providers: [StudentCoverRepository], // service 넣을꺼면 앞에다 넣어야함.
})
export class studentCoverModule {}
