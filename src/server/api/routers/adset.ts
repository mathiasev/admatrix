import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { adsets } from "~/server/db/schema";

export const adsetRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string(),
      campaignId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(adsets).values({
        name: input.name,
        description: input.description,
        campaignId: input.campaignId,
        createdById: ctx.session.user.id,
      });
    }),

  getAdsets: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.adsets.findMany({
      orderBy: (adsets, { desc }) => [desc(adsets.createdAt)],
      with: {
        campaign: true,
      }
    });
  }),

  getAdsetById: protectedProcedure.input(z.object({
    adsetId: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.query.adsets.findFirst({
      where: (adsets, { eq }) => eq(adsets.id, input.adsetId),
      orderBy: (adsets, { desc }) => [desc(adsets.createdAt)],
      with: {
        ads: true,
        campaign: {
          with: {
            client: true,
            channel: true
          }
        }
      }
    });
  }),

  getAdsetByCampaignId: protectedProcedure.input(z.object({
    campaignId: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.query.adsets.findFirst({
      where: (adsets, { eq }) => eq(adsets.campaignId, input.campaignId),
      orderBy: (adsets, { desc }) => [desc(adsets.createdAt)],
      with: {
        campaign: true
      }
    });
  }),

});
