import { InstitutionCoverDTO } from './institution.cover.dto';

export class InstitutionDTO {
  id?: string;
  name?: string;
  runtime?: string;
  tel?: string;
  email?: string;
  type?: string;
  institutionCover?: InstitutionCoverDTO;
}
