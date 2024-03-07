import { CourseCoverDTO } from './course.cover.dto';

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
}
