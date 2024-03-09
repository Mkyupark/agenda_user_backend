import { TeacherCover } from '../../entities/user/coverImg.entity';
import { Institution } from '../../entities/user/institution.entity';

export class TeacherDTO {
  id!: string;
  name!: string;
  subject!: string;
  language!: string;
  country?: string;
  login_at?: Date;
  create_at!: Date;
  is_login?: boolean;
  type!: string;
  teacherCover?: TeacherCover;
  institution!: Institution;
}
