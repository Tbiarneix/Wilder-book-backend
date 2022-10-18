import { Field } from "type-graphql";
import { ApolloError } from "apollo-server";
import { Arg, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Wilder } from "../entity/wilder";

import dataSource from "../utils";

@InputType()
class AddWildernput {
  @Field()
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
class UpdateWilderInput extends AddWildernput {
  @Field()
  id: number;
}

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => [Wilder])
  async getAllWilders(): Promise<Wilder[]> {
    return await dataSource.manager.find(Wilder, {
      relations: {
        grade: {
          skill: true,
        },
      },
    });
  }

  @Query(() => Wilder)
  async getOneWilder(
    @Arg("id") id: number
  ): Promise<Wilder | ApolloError | null> {
    return await dataSource.manager.findOneOrFail(Wilder, {
      where: { id },
      relations: {
        grade: {
          skill: true,
        },
      },
    });
  }

  @Mutation(() => Wilder)
  async createWilder(
    @Arg("data") newWilderData: AddWildernput
  ): Promise<Wilder> {
    const wilderFromDB = await dataSource.manager.save(Wilder, newWilderData);
    return wilderFromDB;
  }

  @Mutation(() => Wilder)
  async updateWilder(
    @Arg("data") updateWilderData: UpdateWilderInput
  ): Promise<Wilder | ApolloError> {
    const wilderToUpdate = await dataSource.manager.findOneBy(Wilder, {
      id: updateWilderData.id,
    });
    if (wilderToUpdate) {
      return await dataSource.manager.save(Wilder, {
        wilderToUpdate,
        ...updateWilderData,
      });
    } else {
      return new ApolloError("Wilder not found");
    }
  }

  @Mutation(() => String)
  async deleteWilder(
    @Arg("id") id: number
  ): Promise<Wilder | null | ApolloError | String> {
    try {
      const wilderToDelete = await dataSource.manager.findOne(Wilder, {
        where: { id },
      });
      if (!wilderToDelete) {
        const errorMessage = `No Wilder found`;
        return errorMessage;
      } else {
        const deletedMessage = `Wilder deleted`;
        await dataSource.manager.delete(Wilder, id);
        return deletedMessage;
      }
    } catch (err) {
      return new ApolloError("Error");
    }
  }
}
