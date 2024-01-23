import { STRING } from "sequelize";
import { sequelize } from "../database/index.js";

const Record = sequelize.define("record", {
  customer_id: {
    type: STRING,
  },
  event_type: {
    type: STRING,
  },
  event_id: {
    type: STRING,
    primaryKey: true,
  },
  event_date: {
    type: STRING,
  },
});

export default Record;
