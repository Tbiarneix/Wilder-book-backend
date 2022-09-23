import express from "express";
import cors from "cors";
import dataSource from "./utils";

import wilderController from "./controller/wilder";
import skillController from "./controller/skill";
import gradeController from "./controller/grade";

const app = express();
const port = 5000;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/wilders", wilderController.create);
app.delete("/api/wilders", wilderController.delete);
app.get("/api/wilders", wilderController.read);
app.get("/api/getonewilder", wilderController.readOne);
app.put("/api/wilders", wilderController.update);

app.post("/api/skills", skillController.create);
app.delete("/api/skills", skillController.delete);
app.get("/api/skills", skillController.read);
app.put("/api/skills", skillController.update);

app.get("/api/grade", gradeController.read);
app.get("/api/gradeFromOneWilder", gradeController.readGradesFromOneWilder);
app.post("/api/grade", gradeController.create);
app.put("/api/grade", gradeController.update);
app.delete("/api/grade", gradeController.delete);

app.get("/api/getOneWilder", wilderController.readOne);

const start = async (): Promise<void> => {
  await dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

void start();
