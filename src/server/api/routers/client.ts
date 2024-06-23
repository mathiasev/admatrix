import { channel } from "diagnostics_channel";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";
import { campaigns, clients } from "~/server/db/schema";

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
      with: {
        campaigns: {

          columns: {
            id: true,
            name: true
          }
        }
      }
    });
  }),

  getClientById: protectedProcedure.input(z.object({
    clientId: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.query.clients.findFirst({
      where: (clients, { eq }) => eq(clients.id, input.clientId),
      orderBy: (clients, { desc }) => [desc(clients.createdAt)],
      with: {
        campaigns: {
          with: {
            channel: true
          }
        }
      }
    });
  }),

});
