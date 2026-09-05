#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/96d7847641bbe2f447f813a4cb462593ed1005c9e7608a831287786a01ec1048/contract';
import endContract from '../../snapshots/96d7847641bbe2f447f813a4cb462593ed1005c9e7608a831287786a01ec1048/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/d20ae2345bfa47783794a359c68d63c8673344dc97fdc1c5a3abf4bc41dd65d2/contract';
import startContract from '../../snapshots/d20ae2345bfa47783794a359c68d63c8673344dc97fdc1c5a3abf4bc41dd65d2/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'roomMember',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('joinedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('roomId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'roomMember',
        constraint: 'roomMember_roomId_userId_key',
        columns: ['roomId', 'userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'roomMember',
        index: 'roomMember_roomId_idx_fe51d647',
        columns: ['roomId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'roomMember',
        index: 'roomMember_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'roomMember',
        foreignKey: {
          name: 'roomMember_roomId_fkey',
          columns: ['roomId'],
          references: { schema: 'public', table: 'room', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'roomMember',
        foreignKey: {
          name: 'roomMember_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
