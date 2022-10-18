import { Field } from "type-graphql";
import { ApolloError } from "apollo-server";
import { Arg, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Skill } from "../entity/skill";
import dataSource from "../utils";

@InputType()
class UpdateSkillInput {
  @Field()
  id: number;

  @Field()
  name: string;
}
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
    return skillFromDB;
  }

  @Mutation(() => Skill)
  async updateSkill(
    @Arg("data") updateSkillData: UpdateSkillInput
  ): Promise<Skill | ApolloError> {
    const skillToUpdate = await dataSource.manager.findOneBy(Skill, {
      id: updateSkillData.id,
    });
    if (updateSkillData) {
      return await dataSource.manager.save(Skill, {
        skillToUpdate,
        ...updateSkillData,
      });
    } else {
      return new ApolloError("Skill not found");
    }
  }

  @Mutation(() => String)
  async deleteSkill(
    @Arg("id") id: number
  ): Promise<Skill | null | ApolloError | String> {
    try {
      const deletedMessage = `Skill deleted`;
      await dataSource.manager.delete(Skill, id);
      return deletedMessage;
    } catch (err) {
      return new ApolloError("Error");
    }
  }
}
