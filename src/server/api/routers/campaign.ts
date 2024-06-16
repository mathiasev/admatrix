import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { campaigns } from "~/server/db/schema";

export const campaignRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      objective: z.string().min(1),
      client: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(campaigns).values({
        name: input.name,
        description: input.description,
        objective: input.objective,
        clientId: input.client,
        createdById: ctx.session.user.id,
      });
    }),

  getCampaigns: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.campaigns.findMany({
      orderBy: (campaigns, { desc }) => [desc(campaigns.createdAt)],
      with: {
        client: {
          columns: {
            id: true,
            name: true
          }
        }
      }
    });
  }),

});
