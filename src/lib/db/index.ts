import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function getDb() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set in environment variables");
  }

  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

export const db = getDb();
export { schema };
