import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Source {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: string;
}
