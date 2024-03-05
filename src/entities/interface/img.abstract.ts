import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class ImgCover {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  file_name!: string;

  @Column()
  file_url!: string;
}
