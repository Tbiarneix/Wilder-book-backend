import { DataSource } from "typeorm";
import { Wilder } from "./entity/wilder";
import { Skill } from "./entity/skill";
import { Grade } from "./entity/grade";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skill, Grade],
  logging: ["query", "error"],
});

export default dataSource;
