import { z } from 'zod';

export const SpaceSchema = z.object({
  name: z.string(),
  sys: z.object({
    createdAt: z.string(),
    createdBy: z.object({
      sys: z.object({
        id: z.string(),
        linkType: z.string(),
        type: z.string(),
      }),
    }),
    id: z.string(),
    organization: z.object({
      sys: z.object({
        id: z.string(),
        linkType: z.string(),
        type: z.string(),
      }),
    }),
    type: z.string(),
    updatedAt: z.string(),
    updatedBy: z.object({
      sys: z.object({
        id: z.string(),
        linkType: z.string(),
        type: z.string(),
      }),
    }),
    version: z.number(),
  }),
});

export const SpaceCollectionSchema = z.object({
  sys: z
    .object({
      type: z.literal('Array').optional(),
    })
    .optional(),
  total: z.number().optional(),
  skip: z.number().optional(),
  limit: z.number().optional(),
  items: z.array(SpaceSchema).optional(),
});
