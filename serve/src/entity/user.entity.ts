import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base';

@Entity()
/**
 * 用戶表
 */
export class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}