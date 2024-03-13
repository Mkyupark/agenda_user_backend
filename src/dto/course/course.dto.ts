import { Teacher } from '../../entities/user/teacher.entity';
import { CourseCoverDTO } from './course.cover.dto';
import { Institution } from '../../entities/user/institution.entity';

export class CourseDTO {
  id?: string;
  tilte?: string;
  total_quiz?: string;
  level?: string;
  total_hour?: string;
  total_student?: string;
  create_at?: Date;
  price?: number;
  discount?: number;
  language?: string;
  total_rate?: string;
  courseCover?: CourseCoverDTO;
  institution_id?: string;
  institution?: any;
}
