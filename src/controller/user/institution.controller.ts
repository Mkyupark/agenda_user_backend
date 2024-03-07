import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { coverStorage } from '../../secure/storage';
import { InstitutionRepository } from '../../repository/user/institution.repository';
import { InstitutionDTO } from '../../dto/user/institution.dto';

@Controller('institutions')
export class institutionController {
  private bucket;
  constructor(private institutionRepository: InstitutionRepository) {
    this.bucket = coverStorage();
  }
  // 비밀번호 찾기랑 초기화 로그인 로그아웃 회원가
  @Post() //ok
  async createOrUpdateInstitution(@Body() institutionDTO: InstitutionDTO, @Res() res: Response) {
    try {
      const createdInstitution = await this.institutionRepository.createOrUpdate(institutionDTO);
      return res.status(HttpStatus.CREATED).json(createdInstitution);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Delete()
  async DeleteInstitution(@Param('id') id: string, @Res() res: Response) {
    try {
      const institution = await this.institutionRepository.findById(id);
      const fileName = institution?.institutionCover?.file_name;
      await this.bucket.file(fileName!).delete();
      await this.institutionRepository.deleteById(id);
      return res.status(HttpStatus.OK).json(institution);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
  @Get()
  async findOneInstitution(@Param('id') id: string, @Res() res: Response) {
    try {
      const institution = await this.institutionRepository.findById(id);
      if (!institution) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Institution Not Found' });
      }
      console.log(institution);
      return res.status(HttpStatus.OK).json(institution);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  //   @Get('login') //ok
  //   async Login(@Param('id') id: string, @Res() res: Response) {
  //     try {
  //       const institution = await this.institutionRepository.findById(id);
  //       if (!institution) {
  //         return res.status(HttpStatus.NOT_FOUND).json({ message: 'Institution Not Found' });
  //       }
  //       return res.status(HttpStatus.OK).json(institution);
  //     } catch (error) {
  //       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
  //     }
  //   }
}
