import { db } from "./prisma/db";

let connected = false;

export async function connectDb() {
  if (!connected) {
    await db.connect({ url: process.env.DATABASE_URL! });
    connected = true;
  }
  return db;
}

export { db };