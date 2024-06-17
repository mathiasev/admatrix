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
      description: z.string(),
      objective: z.string().min(1),
      clientId: z.string().min(1),
      channelId: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(campaigns).values({
        name: input.name,
        description: input.description,
        objective: input.objective,
        channelId: input.channelId,
        clientId: input.clientId,
        createdById: ctx.session.user.id,
      });
    }),

  getCampaigns: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.campaigns.findMany({
      orderBy: (campaigns, { desc }) => [desc(campaigns.createdAt)],
      with: {
        channel: true,
        client: {
          columns: {
            id: true,
            name: true
          }
        }
      }
    });
  }),

  getCampaignById: protectedProcedure.input(z.object({
    campaignId: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.query.campaigns.findFirst({
      where: (campaigns, { eq }) => eq(campaigns.id, input.campaignId),
      orderBy: (campaigns, { desc }) => [desc(campaigns.createdAt)],
      with: {
        channel: true,
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
