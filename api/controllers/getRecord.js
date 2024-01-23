import Record from "../models/recordModel.js";

const getRecord = (_req, res) => {
  Record.findOne(_req.params.event_id)
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

export default getRecord;
