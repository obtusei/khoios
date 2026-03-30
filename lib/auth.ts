import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      osName: {
        type: "string",
        required: true,
      },
      username: {
        type: "string",
        required: true,
      },
    },
  },
});
