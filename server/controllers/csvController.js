import Record from "../models/recordModel.js";
import { createReadStream } from "fs";
import { parse } from "fast-csv";
import { Parser as CsvParser } from "json2csv";

/*
Pull the data that the middleware sent to local disk storage and parse it, then store it in the db
*/

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a csv file");
    }

    let records = [];
    let path = "./resources/static/assets/uploads/" + req.file.filename;

    createReadStream(path)
      .pipe(parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", () => {
        Record.bulkCreate(records)
          .then(() => {
            res.status(200).send({
              message:
                "The file: " +
                req.file.originalname +
                " was uploaded successfully!",
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Could not import data into database",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to upload the file: " + req.file.originalname,
    });
  }
};

const download = (_req, res) => {
  Record.findAll().then((objs) => {
    let records = [];

    objs.forEach((obj) => {
      const { customer_id, event_type, event_id, event_date } = obj;
      records.push({
        customer_id,
        event_type,
        event_id,
        event_date,
      });
    });

    const csvFields = ["customer_id", "event_type", "event_id", "event_date"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(records);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=records.csv");

    res.status(200).end(csvData);
  });
};

export default {
  upload,
  download,
};
