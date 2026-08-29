#!/usr/bin/env -S node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contract_json_1 = __importDefault(require("../../snapshots/777d104d4c639e37e53ccad0df092bfc5ebbd0217a3ea0ce992cd94040c52e5f/contract.json"));
const migration_1 = require("@prisma/orm-postgres/migration");
class M extends migration_1.Migration {
    endContractJson = contract_json_1.default;
    get operations() {
        return [
            this.createSchema({ schema: 'public' }),
            this.createTable({
                schema: 'public',
                table: 'chat',
                columns: [
                    (0, migration_1.col)('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
                    (0, migration_1.col)('message', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                    (0, migration_1.col)('roomId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
                    (0, migration_1.col)('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                ],
                constraints: [(0, migration_1.primaryKey)(['id'])],
            }),
            this.createTable({
                schema: 'public',
                table: 'room',
                columns: [
                    (0, migration_1.col)('adminId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                    (0, migration_1.col)('createdAt', 'timestamptz', {
                        notNull: true,
                        default: (0, migration_1.fn)('now()'),
                        codecRef: { codecId: 'pg/timestamptz-temporal@1' },
                    }),
                    (0, migration_1.col)('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
                    (0, migration_1.col)('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                ],
                constraints: [(0, migration_1.primaryKey)(['id'])],
            }),
            this.createTable({
                schema: 'public',
                table: 'user',
                columns: [
                    (0, migration_1.col)('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                    (0, migration_1.col)('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                    (0, migration_1.col)('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                    (0, migration_1.col)('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                    (0, migration_1.col)('photo', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                ],
                constraints: [(0, migration_1.primaryKey)(['id'])],
            }),
            this.addUnique({
                schema: 'public',
                table: 'room',
                constraint: 'room_slug_key',
                columns: ['slug'],
            }),
            this.addUnique({
                schema: 'public',
                table: 'user',
                constraint: 'user_email_key',
                columns: ['email'],
            }),
            this.createIndex({
                schema: 'public',
                table: 'chat',
                index: 'chat_roomId_idx_fe51d647',
                columns: ['roomId'],
            }),
            this.createIndex({
                schema: 'public',
                table: 'chat',
                index: 'chat_userId_idx_a489d58a',
                columns: ['userId'],
            }),
            this.createIndex({
                schema: 'public',
                table: 'room',
                index: 'room_adminId_idx_530179db',
                columns: ['adminId'],
            }),
            this.addForeignKey({
                schema: 'public',
                table: 'chat',
                foreignKey: {
                    name: 'chat_roomId_fkey',
                    columns: ['roomId'],
                    references: { schema: 'public', table: 'room', columns: ['id'] },
                },
            }),
            this.addForeignKey({
                schema: 'public',
                table: 'chat',
                foreignKey: {
                    name: 'chat_userId_fkey',
                    columns: ['userId'],
                    references: { schema: 'public', table: 'user', columns: ['id'] },
                },
            }),
            this.addForeignKey({
                schema: 'public',
                table: 'room',
                foreignKey: {
                    name: 'room_adminId_fkey',
                    columns: ['adminId'],
                    references: { schema: 'public', table: 'user', columns: ['id'] },
                },
            }),
        ];
    }
}
exports.default = M;
migration_1.MigrationCLI.run(import.meta.url, M);
