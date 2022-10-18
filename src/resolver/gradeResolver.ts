import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Grade } from "../entity/grade";
import dataSource from "../utils";

@Resolver(Grade)
export class GradeResolver {
  @Query(() => [Grade])
  async getAllGrades(): Promise<Grade[]> {
    return await dataSource.manager.find(Grade);
  }

  // @Mutation(() => Grade)
  // async createGrade(@Arg("name") name: string): Promise<Grade> {
  //   const newGrade = new Grade();
  //   newGrade.name = name;
  //   const gradeFromDB = await dataSource.manager.save(Grade, newGrade);
  //   return gradeFromDB;
  // }
}
