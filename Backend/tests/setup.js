import { db } from '../src/database/db.js';

export const clearDatabase = async () => {
  await db.query("SET FOREIGN_KEY_CHECKS = 0");
  await db.query("TRUNCATE TABLE Users");
  await db.query("SET FOREIGN_KEY_CHECKS = 1");
};

export const closeConnection = async () => {
  await db.end();
};