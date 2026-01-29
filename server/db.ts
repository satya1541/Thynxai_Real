import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@shared/schema";

const pool = mysql.createPool({
  host: "40.192.42.60",
  port: 3306,
  user: "testing",
  password: "testing@2025",
  database: "Thynxai_Cloud",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(pool, { schema, mode: "default" });
