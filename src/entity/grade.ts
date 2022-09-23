import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wilder } from "./wilder";
import { Skill } from "./skill";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.grade, {
    cascade: true,
    onDelete: "CASCADE",
  })
  wilder!: Wilder;

  @ManyToOne(() => Skill, (skill) => skill.grade, {
    cascade: true,
    onDelete: "CASCADE",
  })
  skill!: Skill;
}
