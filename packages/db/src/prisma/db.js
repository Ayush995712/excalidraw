"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const runtime_1 = __importDefault(require("@prisma/orm-postgres/runtime"));
const contractJson = require('./contract.json');
exports.db = (0, runtime_1.default)({
    contractJson,
    url: process.env['DATABASE_URL'],
});
