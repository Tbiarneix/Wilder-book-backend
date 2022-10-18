import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Skill } from "../entity/skill";
import dataSource from "../utils";

@Resolver(Skill)
export class SkillResolver {
  @Query(() => [Skill])
  async getAllSkills(): Promise<Skill[]> {
    return await dataSource.manager.find(Skill);
  }

  @Mutation(() => Skill)
  async createSkill(@Arg("name") name: string): Promise<Skill> {
    const newSkill = new Skill();
    newSkill.name = name;
    const skillFromDB = await dataSource.manager.save(Skill, newSkill);
    console.log(skillFromDB);
    return skillFromDB;
  }
}
