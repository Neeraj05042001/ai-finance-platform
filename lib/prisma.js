import { PrismaClient } from "./generated/prisma";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

/*globalThis.prisma: This global variable ensures that the prisma client instance is resused across hot reloads during development. Without this, each time your application relaods , a new instance of the prisma client would be created, potentially leading to connection issues.*/
