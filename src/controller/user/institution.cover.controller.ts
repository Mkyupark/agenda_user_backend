import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { coverStorage } from '../../secure/storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { InstitutionCoverRepository } from '../../repository/user/institution.cover.repository';
import { InstitutionRepository } from '../../repository/user/institution.repository';
import { InstitutionCoverDTO } from '../../dto/user/institution.cover.dto';

@Controller('institutions/covers')
export class InstitutionCoverController {
  private bucket;

  constructor(
    private InstitutionCoverRepository: InstitutionCoverRepository,
    private institutionRepository: InstitutionRepository
  ) {
    this.bucket = coverStorage();
  }
  private async checkFileExists(fileName: string): Promise<boolean> {
    const file = this.bucket.file(fileName);
    const [exists] = await file.exists();
    return exists;
  }
  // 비밀번호 찾기랑 초기화 로그인 로그아웃 회원가
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createOrUpdateCoverImg(
    @UploadedFile() file: Express.Multer.File,
    @Body('institution_id') temp: string
  ) {
    try {
      const fileName = `institution_cover/${Date.now()}_ ${file.originalname}`;
      const fileUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;

      const blob = this.bucket.file(fileName);
      const blobStream = await blob.createWriteStream({ resumable: false });
      blobStream.on('error', (error) => {
        return error;
      });
      blobStream.on('finish', () => {});
      await blobStream.end(file.buffer);

      const institution = await this.institutionRepository.findById(temp);
      const institutionCoverDTO: InstitutionCoverDTO = {
        file_name: fileName,
        file_url: fileUrl,
        institution: institution,
      };
      if (institution?.institutionCover !== null) {
        const fileExists = await this.checkFileExists(institution?.institutionCover?.file_name!);
        if (fileExists) {
          await this.bucket.file(institution?.institutionCover?.file_name!).delete();
        }
        const updateInstitutionCover = await this.InstitutionCoverRepository.createOrUpdate(
          institution?.institutionCover?.file_name!,
          institutionCoverDTO
        );
        return updateInstitutionCover;
      }
      const createInstitutionCover =
        await this.InstitutionCoverRepository.create(institutionCoverDTO);
      return createInstitutionCover;
    } catch (error) {
      return error;
    }
  }
}
