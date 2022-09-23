import { Request, Response } from "express";
import { Skill } from "../entity/skill";
// import { Grade } from "../entity/grade";
import dataSource from "../utils";

const skills = dataSource.getRepository(Skill);
// const grades = dataSource.getRepository(Grade);

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}
const skillController: IController = {
  read: async (req, res): Promise<void> => {
    try {
      const allSkills = await skills.find();
      res.send(allSkills);
    } catch (err) {
      res.send(err);
    }
  },
  create: async (req, res): Promise<void> => {
    try {
      const skillToCreate = await skills.findOneBy({ name: req.body.name });
      if (skillToCreate === null) {
        const createdSkill = await skills.save(req.body);
        res.send(createdSkill);
      } else {
        res.status(400).send("Skill allready exists !");
      }
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req, res): Promise<void> => {
    try {
      const skillToDelete = await skills.findOneBy({ id: req.body.idToDelete });
      if (skillToDelete !== null) {
        await skills.delete({ id: req.body.idToDelete });
        res.send("Skill deleted");
      } else {
        res.status(400).send("No skill found !");
      }
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req, res): Promise<void> => {
    try {
      await skills.save(req.body);
      res.send("Skill Updated");
    } catch (err) {
      res.send(err);
    }
  },
};

export default skillController;
