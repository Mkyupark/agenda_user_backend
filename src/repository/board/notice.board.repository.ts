import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeBoardDTO } from '../../dto/board/notice.board.dto';
import { NoticeBoard } from '../../entities/board/notice.board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeBoardRepository {
  constructor(
    @InjectRepository(NoticeBoard)
    private readonly repository: Repository<NoticeBoardDTO>
  ) {}

  async create(noticeBoardDTO: NoticeBoardDTO) {
    return await this.repository.save(noticeBoardDTO);
  }

  async update(noticeBoardDTO: NoticeBoardDTO) {
    const noticeBoard = await this.repository.findOne({
      where: {
        id: noticeBoardDTO.id,
        institution: { id: noticeBoardDTO.institution.id },
      },
    });
    if (noticeBoard) {
      return await this.repository.save(noticeBoardDTO);
    }

    return false;
  }
  async findById(id: string) {
    return await this.repository.findOne({ where: { id: id } });
  }
  async delete(noticeBoardDTO: NoticeBoardDTO) {
    return await this.repository.delete({
      id: noticeBoardDTO.id,
      institution: { id: noticeBoardDTO.institution.id },
    });
  }
}
