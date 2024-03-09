import { TeacherCover } from '../../entities/user/coverImg.entity';

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
  institution_id?: string;
  teacherCover?: TeacherCover;
  institution!: any;
}
