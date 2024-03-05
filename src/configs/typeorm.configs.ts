import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '34.67.106.208',
  port: 3306,
  username: 'gs-teaching',
  password: 'gs-teaching!@#123',
  database: 'teaching',
  autoLoadEntities: true,
  logging: true,
  synchronize: true,
  entities: ['../entities/**/*.ts'],
};
