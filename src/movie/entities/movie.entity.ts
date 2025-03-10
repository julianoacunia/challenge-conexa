import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  director: string;

  @Column({ type: 'int', nullable: true })
  releaseYear: number;

  @Column({ type: 'text', nullable: true })
  synopsis: string;
}
