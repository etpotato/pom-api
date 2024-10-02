import { Role, RoleValue } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column()
  public passwordHash: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  public role: RoleValue;

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: string;
}
