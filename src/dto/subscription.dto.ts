import { CourseDTO } from './course/course.dto';
import { StudentDTO } from './user/student.dto';

export class SubscriptionDTO {
  id?: string;
  percent?: number;
  is_review?: boolean;
  start_at?: Date;
  end_at?: Date;
  student?: StudentDTO;
  course?: CourseDTO;
}
