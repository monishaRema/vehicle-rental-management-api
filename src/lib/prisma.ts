import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";



const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
  log: [{ emit: "event", level: "query" }],
});
prisma.$on("query", (e) => {
  console.log(`[${e.duration}ms] ${e.query}`);
});