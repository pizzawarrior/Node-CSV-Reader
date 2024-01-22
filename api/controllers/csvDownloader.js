import Record from "../models/recordModel.js";
import { Parser as CsvParser } from "json2csv";

const csvDownloader = (_req, res) => {
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

export default csvDownloader;
