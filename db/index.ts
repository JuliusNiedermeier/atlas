import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "./schema";

const sqlitedb = SQLite.openDatabaseSync("data.db");

export const db = drizzle(sqlitedb, { schema });
