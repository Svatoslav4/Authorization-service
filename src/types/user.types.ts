import { prisma } from "../prisma/client";

export type User = NonNullable<
  Awaited<ReturnType<typeof prisma.user.findUnique>>
>;