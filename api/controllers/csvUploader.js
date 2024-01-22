import Record from "../models/recordModel.js";
import { createReadStream } from "fs";
import { parse } from "fast-csv";

/*
Pull the data that the middleware sent to local disk storage and parse it, then store it in the db
*/

const csvUploader = async (req, res) => {
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

export default csvUploader;
