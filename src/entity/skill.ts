import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Grade } from "./grade";

@ObjectType()
@Entity()
export class Skill {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => Grade)
  @OneToMany(() => Grade, (grade) => grade.skill, { onDelete: "CASCADE" })
  grade!: Grade[];
}
