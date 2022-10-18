import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { WilderResolver } from "./resolver/wilderResolver";
import { GradeResolver } from "./resolver/gradeResolver";
import { SkillResolver } from "./resolver/skillResolver";
import dataSource from "./utils";

const port = 5000;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WilderResolver, GradeResolver, SkillResolver],
  });
  const server = new ApolloServer({ schema });

  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`🚀  Server ready at ${url}`);
  } catch (err) {
    console.log("Error starting the server");
  }
};

void start();
