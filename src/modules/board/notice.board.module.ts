import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeBoardController } from '../../controller/board/notice.board.controller';
import { NoticeBoard } from '../../entities/board/notice.board.entity';
import { Institution } from '../../entities/user/institution.entity';
import { Teacher } from '../../entities/user/teacher.entity';
import { NoticeBoardRepository } from '../../repository/board/notice.board.repository';
import { InstitutionRepository } from '../../repository/user/institution.repository';
import { TeacherRepository } from '../../repository/user/teacher.repository';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([NoticeBoard, Institution, Teacher])],
  controllers: [NoticeBoardController],
  providers: [NoticeBoardRepository, InstitutionRepository, TeacherRepository],
})
export class noticeBoardModule {}
