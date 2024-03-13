export class NoticeBoardDTO {
  id?: string;
  title?: string;
  content?: string;
  fix?: boolean;
  institution_id!: string;
  teacher_id?: string;
  institution?: any;
  teacher?: any;
}
