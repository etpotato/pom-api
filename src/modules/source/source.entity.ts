import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Source {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;
}
