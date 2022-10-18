import { Field } from "type-graphql";
import { ApolloError } from "apollo-server";
import { Arg, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Grade } from "../entity/grade";
import { Wilder } from "../entity/wilder";
import { Skill } from "../entity/skill";
import dataSource from "../utils";

@InputType()
class AddGradeInput {
  @Field()
  wilderId: number;

  @Field()
  grade: number;

  @Field()
  skillName: string;
}

@InputType()
class UpdateGradeInput {
  @Field()
  id: number;

  @Field()
  grade: number;
}

@Resolver(Grade)
export class GradeResolver {
  @Query(() => [Grade])
  async getAllGrades(): Promise<Grade[]> {
    return await dataSource.manager.find(Grade);
  }

  @Mutation(() => Grade)
  async createGrade(
    @Arg("data") newGradeData: AddGradeInput
  ): Promise<Grade | Wilder | Skill> {
    const wilderToAddGrade = await dataSource.manager.findOneOrFail(Wilder, {
      where: { id: newGradeData.wilderId },
    });
    const skillToAddGrade = await dataSource.manager.findOneOrFail(Skill, {
      where: { name: newGradeData.skillName },
    });

    const gradeToSave = await dataSource.manager.save(Grade, {
      grade: newGradeData.grade,
      wilder: wilderToAddGrade,
      skill: skillToAddGrade,
    });

    return gradeToSave;
  }

  @Mutation(() => Grade)
  async updateGrade(
    @Arg("data") updateGradeData: UpdateGradeInput
  ): Promise<Grade | Wilder | Skill> {
    const gradeToUpdate = await dataSource.manager.findOneOrFail(Grade, {
      where: { id: updateGradeData.id },
    });

    return await dataSource.manager.save(Grade, {
      gradeToUpdate,
      ...updateGradeData,
    });
  }

  @Mutation(() => String)
  async deleteGrade(
    @Arg("id") id: number
  ): Promise<Grade | null | ApolloError | String> {
    try {
      const gradeToDelete = await dataSource.manager.findOne(Skill, {
        where: { id },
      });
      if (!gradeToDelete) {
        const errorMessage = `No grade found`;
        return errorMessage;
      } else {
        const deletedMessage = `Grade deleted`;
        await dataSource.manager.delete(Grade, id);
        return deletedMessage;
      }
    } catch (err) {
      return new ApolloError("Error");
    }
  }
}
