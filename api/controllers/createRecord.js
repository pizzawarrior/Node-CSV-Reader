import Record from "../models/recordModel.js";

const createRecord = (_req, res) => {
  Record.create({
    customer_id: _req.body.customer_id,
    event_type: _req.body.event_type,
    event_id: _req.body.event_id,
    event_date: _req.body.event_date,
  })
    .then((record) => {
      res.status(200).send(JSON.stringify(record));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
};

export default createRecord;
