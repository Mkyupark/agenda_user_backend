import { StudentCover } from '../entities/coverImg.entity';
import { StudentCoverDTO } from './student.cover.dto';

export class StudentDTO {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  country?: string;
  phone_num?: string;
  about?: string;
  login_at?: Date; // 생각
  create_at?: Date;
  is_login?: string; // 생각
  type?: string; // 생각
  studentCover?: StudentCoverDTO;
}
