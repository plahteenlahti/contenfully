import { z } from 'zod';
import { LocaleOption } from './locale';

const LinkSysSchema = z.object({
  type: z.string(),
  linkType: z.string(),
  id: z.string(),
});

const UserLinkSchema = z.object({
  sys: LinkSysSchema.extend({
    linkType: z.literal('User'),
  }),
});

const SysSchema = z.object({
  space: z.object({
    sys: LinkSysSchema.extend({
      linkType: z.literal('Space'),
      id: z.string(),
    }),
  }),
  id: z.string(),
  type: z.literal('Asset'),
  createdAt: z.string(),
  updatedAt: z.string(),
  environment: z.object({
    sys: LinkSysSchema.extend({
      linkType: z.literal('Environment'),
      id: z.string(),
    }),
  }),
  publishedVersion: z.number().optional(),
  publishedAt: z.string().optional(),
  firstPublishedAt: z.string(),
  createdBy: UserLinkSchema,
  updatedBy: UserLinkSchema,
  publishedCounter: z.number(),
  version: z.number(),
  publishedBy: UserLinkSchema.optional(),
});

const FileSchema = z.object({
  url: z.string(),
  details: z.object({
    size: z.number(),
    image: z.object({
      width: z.number(),
      height: z.number(),
    }),
  }),
  fileName: z.string(),
  contentType: z.string(),
});

export const MediaSchema = z.object({
  metadata: z.object({
    tags: z.array(z.any()),
  }),
  sys: SysSchema,
  fields: z.object({
    title: z.record(z.string(), z.string()),
    file: z.record(z.string(), FileSchema),
  }),
});

export const MediaCollectionSchema = z.object({
  sys: z.object({
    type: z.string(),
  }),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  items: z.array(MediaSchema),
});
