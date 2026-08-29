import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';

const contractJson = require('./contract.json') as Contract;

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});
