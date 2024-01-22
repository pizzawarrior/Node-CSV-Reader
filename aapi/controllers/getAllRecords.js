import Record from "../models/recordModel.js";

const getRecords = (_req, res) => {
  Record.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error occurred while retrieving records from the database",
      });
    });
};

export default getRecords;
