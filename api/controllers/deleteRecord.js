import Record from "../models/recordModel.js";

const deleteRecord = (_req, res) => {
  Record.destroy({
    where: {
      event_id: _req.params.event_id,
    },
  })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
};

export default deleteRecord;
