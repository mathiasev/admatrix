import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";
import { clients } from "~/server/db/schema";

export const clientRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(clients).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  getClients: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.clients.findMany({
      orderBy: (clients, { desc }) => [desc(clients.createdAt)],
    });
  }),

});
