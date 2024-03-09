import { StudentCover } from '../../entities/user/coverImg.entity';
import { SubscriptionDTO } from '../subscription.dto';
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
  subscription?: SubscriptionDTO;
}
