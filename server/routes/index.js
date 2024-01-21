import { Router } from "express";
import csvController from "../controllers/csvController.js";
import getRecords from "../controllers/recordController.js";
import uploadFile from "../middleware/upload.js";

const router = Router();

let routes = (app) => {
  //csv routes
  router.post("/csv/upload", uploadFile.single("file"), csvController.upload);
  router.get("/csv/download", csvController.download);

  //records routes
  router.get("/records", getRecords);
  // ADD ANOTHER ROUTE HERE FOR RECORDS BY customer_id

  app.use("/api", router);
};

export default routes;
