#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/02d0a88f80c3fb2fb9dc0aa081f0742b1d59ae525d95a6e0779282f4e26fc20d/contract';
import startContract from '../../snapshots/02d0a88f80c3fb2fb9dc0aa081f0742b1d59ae525d95a6e0779282f4e26fc20d/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d20ae2345bfa47783794a359c68d63c8673344dc97fdc1c5a3abf4bc41dd65d2/contract';
import endContract from '../../snapshots/d20ae2345bfa47783794a359c68d63c8673344dc97fdc1c5a3abf4bc41dd65d2/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'chat',
        column: col('createdAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-string@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
