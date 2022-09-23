import { Request, Response } from "express";
import { Wilder } from "../entity/wilder";
// import { Grade } from "../entity/grade";
import dataSource from "../utils";

const wilders = dataSource.getRepository(Wilder);
// const grades = dataSource.getRepository(Grade);

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}

const wilderController: IController = {
  read: async (req, res): Promise<void> => {
    try {
      const allWilders = await wilders.find({
        relations: {
          grade: {
            skill: true,
          },
        },
      });
      if (allWilders !== null) {
        res.send(allWilders);
      } else {
        res.status(400).send("No wilder found !");
      }
    } catch (err) {
      res.send(err);
    }
  },
  readOne: async (req, res): Promise<void> => {
    try {
      const oneWilder = await wilders.findOneBy({ id: req.body.wilderId });
      if (oneWilder !== null) {
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
      const newWilder = await wilders.save(req.body);
      res.send(newWilder);
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req, res): Promise<void> => {
    try {
      const wilderToUpdate = await wilders.findOneBy({ id: req.body.id });
      if (wilderToUpdate !== null) {
        const result = await wilders.save(req.body);
        res.send(result);
      } else {
        res.status(400).send("No wilder found");
      }
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req, res): Promise<void> => {
    try {
      const wilderToDelete = await wilders.findOneBy({
        id: req.body.idToDelete,
      });
      if (wilderToDelete !== null) {
        await wilders.delete(req.body.idToDelete);
        res.send("wilder deleted");
      } else {
        res.status(400).send("Wilder not found !");
      }
    } catch (err) {
      res.send(err);
    }
  },
};

export default wilderController;
