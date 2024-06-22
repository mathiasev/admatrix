import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";
import { channels } from "~/server/db/schema";

export const channelRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      themeColor: z.string().min(1),
      campaignName: z.string().min(1).default('Campaign'),
      adSetName: z.string().min(1).default('Ad Set'),
      adName: z.string().min(1).default("Ad"),
      objectives: z.array(z.string())
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(channels).values({
        name: input.name,
        themeColor: input.themeColor,
        campaignName: input.campaignName,
        adSetName: input.adSetName,
        adName: input.adName,
        objectives: input.objectives,
        createdById: ctx.session.user.id,
      });
    }),

  getChannels: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.channels.findMany({
      orderBy: (channels, { desc }) => [desc(channels.createdAt)],
    });
  }),

  deleteChannel: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {

      await ctx.db.delete(channels).where(
        eq(channels.id, input.id)
      )

    })

});

