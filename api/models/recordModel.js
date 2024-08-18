import { STRING } from "sequelize";
import { sequelize } from "../database/index.js";

/*
We use event_id as the Primary Key in this table, as this table relates specifically to Usage Records, and the Primary Key in each table must be unique for each row.
If this were a 'Customers' table we would use customer_id, as each entry would be unique for each row.
*/

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
