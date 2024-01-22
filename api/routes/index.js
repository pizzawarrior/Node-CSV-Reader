import { Router } from "express";
import getRecords from "../controllers/getAllRecords.js";
import uploadFile from "../middleware/upload.js";
import csvUploader from "../controllers/csvUploader.js";
import csvDownloader from "../controllers/csvDownloader.js";
import getRecord from "../controllers/getRecord.js";
import createRecord from "../controllers/createRecord.js";
import deleteRecord from "../controllers/deleteRecord.js";

const router = Router();

let routes = (app) => {
  // create uploaded file
  router.post("/csv/upload/", uploadFile.single("file"), csvUploader);

  // get downloaded file
  router.get("/csv/download/", csvDownloader);

  // get all records
  router.get("/records/", getRecords);

  // get single record by event_id
  router.get("/record/:event_id", getRecord);

  // create a new record
  router.put("/", createRecord);

  // delete record by event_id
  router.delete("/event_id", deleteRecord);

  app.use("/api", router);
};

export default routes;
