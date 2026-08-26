import 'dotenv/config';
import path from "node:path"
import dotenv from "dotenv"
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default definePrismaConfig({
  orm: ormConfig({
    contract: "/prisma/schema.prisma",
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
});
