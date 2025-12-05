import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@shared/schema";

const pool = mysql.createPool({
  host: "15.206.156.197",
  port: 3306,
  user: "satya",
  password: "satya123",
  database: "Thynxai_Cloud",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(pool, { schema, mode: "default" });
