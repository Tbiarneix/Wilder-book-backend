import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Grade } from "./grade";

@ObjectType()
@Entity()
export class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [Grade])
  @OneToMany(() => Grade, (grade) => grade.wilder, {
    onDelete: "CASCADE",
  })
  grade?: Grade[];
}
