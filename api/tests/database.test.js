import { sequelize } from "../database/index.js";
import Record from "../models/recordModel.js";

//create Record, find Record by event_id, delete Record

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

test("create record", async () => {
  expect.assertions(1);
  const record = await Record.create({
    customer_id: "33ddtest",
    event_type: "INGEST",
    event_id: "33ddtesttest",
    event_date: "2021-03-01 00:09:01.937+00",
  });
  expect(record.customer_id).toEqual("33ddtest");
});

test("get record by event_id", async () => {
  expect.assertions(2);
  const record = await Record.findOne({
    where: { event_id: "33ddtesttest" },
  });
  expect(record.event_id).toEqual("33ddtesttest");
  expect(record.customer_id).toEqual("33ddtest");
});

test("delete record by event_id", async () => {
  expect.assertions(1);
  await Record.destroy({
    where: { event_id: "33ddtesttest" },
  });
  const record = await Record.findOne({
    where: { event_id: "33ddtesttest" },
  });
  expect(record).toBeNull();
});

afterAll(async () => {
  await sequelize.close();
});
