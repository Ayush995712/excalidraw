"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.connectDb = connectDb;
const db_1 = require("./prisma/db");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return db_1.db; } });
let connected = false;
async function connectDb() {
    if (!connected) {
        await db_1.db.connect({ url: process.env.DATABASE_URL });
        connected = true;
    }
    return db_1.db;
}
