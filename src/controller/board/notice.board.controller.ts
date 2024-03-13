import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { NoticeBoardDTO } from '../../dto/board/notice.board.dto';
import { NoticeBoardRepository } from '../../repository/board/notice.board.repository';
import { InstitutionRepository } from '../../repository/user/institution.repository';
import { TeacherRepository } from '../../repository/user/teacher.repository';

@Controller('api/noticeboards')
export class NoticeBoardController {
  constructor(
    private noticeBoardRepository: NoticeBoardRepository,
    private institutionRepository: InstitutionRepository,
    private teacherRepository: TeacherRepository
  ) {}
  @Post()
  async createNoticeBoard(@Body() noticeBoardDTO: NoticeBoardDTO, @Res() res: Response) {
    try {
      const institution = await this.institutionRepository.findById(noticeBoardDTO.institution_id);
      const teacher = noticeBoardDTO.teacher_id
        ? await this.teacherRepository.findById(noticeBoardDTO.teacher_id)
        : null;

      noticeBoardDTO = {
        ...noticeBoardDTO,
        institution: institution,
        teacher: teacher,
      };

      const create = await this.noticeBoardRepository.create(noticeBoardDTO);
      return res.status(HttpStatus.CREATED).json(create);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Put()
  async updateNoticeBoard(@Body() noticeBoardDTO: NoticeBoardDTO, @Res() res: Response) {
    try {
      const institution = await this.institutionRepository.findById(noticeBoardDTO.institution_id);
      const teacher = noticeBoardDTO.teacher_id
        ? await this.teacherRepository.findById(noticeBoardDTO.teacher_id)
        : null;
      noticeBoardDTO = {
        ...noticeBoardDTO,
        institution: institution,
        teacher: teacher,
      };
      const update = await this.noticeBoardRepository.update(noticeBoardDTO);
      return res.status(HttpStatus.OK).json(update);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Get()
  async findOne(@Query('id') id: string, @Res() res: Response) {
    try {
      const notice = await this.noticeBoardRepository.findById(id);
      return res.status(HttpStatus.OK).json(notice);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
}
