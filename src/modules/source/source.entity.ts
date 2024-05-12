import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Source {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
}
