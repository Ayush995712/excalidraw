#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/02d0a88f80c3fb2fb9dc0aa081f0742b1d59ae525d95a6e0779282f4e26fc20d/contract';
import endContract from '../../snapshots/02d0a88f80c3fb2fb9dc0aa081f0742b1d59ae525d95a6e0779282f4e26fc20d/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/777d104d4c639e37e53ccad0df092bfc5ebbd0217a3ea0ce992cd94040c52e5f/contract';
import startContract from '../../snapshots/777d104d4c639e37e53ccad0df092bfc5ebbd0217a3ea0ce992cd94040c52e5f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [this.dropNotNull({ schema: 'public', table: 'user', column: 'photo' })];
  }
}

MigrationCLI.run(import.meta.url, M);
