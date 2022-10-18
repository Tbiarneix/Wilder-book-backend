import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wilder } from "./wilder";
import { Skill } from "./skill";

@ObjectType()
@Entity()
export class Grade {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  grade: number;

  @Field(() => Wilder)
  @ManyToOne(() => Wilder, (wilder) => wilder.grade, {
    cascade: true,
    onDelete: "CASCADE",
  })
  wilder!: Wilder;

  @Field(() => Skill)
  @ManyToOne(() => Skill, (skill) => skill.grade, {
    cascade: true,
    onDelete: "CASCADE",
  })
  skill!: Skill;
}
