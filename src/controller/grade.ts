import { Request, Response } from "express";
import { Wilder } from "../entity/wilder";
import { Skill } from "../entity/skill";
import { Grade } from "../entity/grade";
import dataSource from "../utils";

const wilders = dataSource.getRepository(Wilder);
const skills = dataSource.getRepository(Skill);
const grades = dataSource.getRepository(Grade);

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}

const gradeController: IController = {
  read: async (req, res): Promise<void> => {
    try {
      const allGrades = await grades.find();
      if (allGrades !== null) {
        res.send(allGrades);
      } else {
        res.status(400).send("No grade found");
      }
    } catch (err) {
      res.send(err);
    }
  },
  readGradesFromOneWilder: async (req, res): Promise<void> => {
    try {
      const wilder = await wilders.findOneBy({ id: req.body.wilderId });
      const wilderGrades = await wilders.find({
        relations: {
          grade: {
            skill: true,
          },
        },
      });
      if (wilder !== null) {
        const oneWilder = wilderGrades.filter(
          (el) => el.id === req.body.wilderId
        );
        res.send(oneWilder);
      } else {
        res.status(400).send("No wilder found");
      }
    } catch (err) {
      res.send(err);
    }
  },
  create: async (req, res): Promise<void> => {
    try {
      const wilderToAddGrade = await wilders.findOneBy({
        id: req.body.wilderId,
      });
      const skillToAddGrade = await skills.findOneBy({
        name: req.body.skillName,
      });

      if (wilderToAddGrade !== null && skillToAddGrade !== null) {
        const result = await grades.save({
          grade: req.body.grade,
          wilder: req.body.wilderId,
          skill: skillToAddGrade,
        });
        res.send(result);
      } else {
        res
          .status(400)
          .send("Wilder and skill need to exist before adding a grade");
      }
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req, res): Promise<void> => {
    try {
      const gradeToUpdate = await grades.findOneBy({
        id: req.body.id,
      });
      if (gradeToUpdate !== null) {
        const result = await grades.save(req.body);
        res.send(result);
      } else {
        res.status(400).send("Grade not found !");
      }
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req, res): Promise<void> => {
    try {
      const gradeToDelete = await grades.findOneBy({
        id: req.body.gradeId,
      });
      if (gradeToDelete !== null) {
        await grades.delete(req.body.gradeId);
        res.send("Grade deleted");
      } else {
        res.status(400).send("Grade not found !");
      }
    } catch (err) {
      res.send(err);
    }
  },
};

export default gradeController;
