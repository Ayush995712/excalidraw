#!/usr/bin/env -S node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contract_json_1 = __importDefault(require("../../snapshots/02d0a88f80c3fb2fb9dc0aa081f0742b1d59ae525d95a6e0779282f4e26fc20d/contract.json"));
const contract_json_2 = __importDefault(require("../../snapshots/777d104d4c639e37e53ccad0df092bfc5ebbd0217a3ea0ce992cd94040c52e5f/contract.json"));
const migration_1 = require("@prisma/orm-postgres/migration");
class M extends migration_1.Migration {
    startContractJson = contract_json_2.default;
    endContractJson = contract_json_1.default;
    get operations() {
        return [this.dropNotNull({ schema: 'public', table: 'user', column: 'photo' })];
    }
}
exports.default = M;
migration_1.MigrationCLI.run(import.meta.url, M);
