import { z } from 'zod';

type xContentfulTopic =
  | 'ContentManagement.ContentType.create'
  | 'ContentManagement.ContentType.save'
  | 'ContentManagement.ContentType.publish'
  | 'ContentManagement.ContentType.unpublish'
  | 'ContentManagement.ContentType.delete'
  | 'ContentManagement.Entry.create'
  | 'ContentManagement.Entry.save'
  | 'ContentManagement.Entry.auto_save'
  | 'ContentManagement.Entry.archive'
  | 'ContentManagement.Entry.unarchive'
  | 'ContentManagement.Entry.publish'
  | 'ContentManagement.Entry.unpublish'
  | 'ContentManagement.Entry.delete'
  | 'ContentManagement.Asset.create'
  | 'ContentManagement.Asset.save'
  | 'ContentManagement.Asset.auto_save'
  | 'ContentManagement.Asset.archive'
  | 'ContentManagement.Asset.unarchive'
  | 'ContentManagement.Asset.publish'
  | 'ContentManagement.Asset.unpublish'
  | 'ContentManagement.Asset.delete';

const Link = z.object({
  type: z.literal('Link'),
  linkType: z.string(),
  id: z.string().optional(),
});

const WebhookDefinitionSys = z.object({
  type: z.literal('WebhookDefinition'),
  id: z.string(),
  version: z.number(),
  space: z.object({
    sys: Link,
  }),
  createdAt: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  createdBy: z.object({
    sys: Link,
  }),
  updatedAt: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  updatedBy: z.object({
    sys: Link,
  }),
});

const Header = z.object({
  key: z.string(),
  value: z.string().nullable().optional(),
});

export const WebhookSchema = z.object({
  sys: WebhookDefinitionSys,
  name: z.string(),
  url: z.string().url(),
  topics: z.array(z.string()).optional(),
  httpBasicUsername: z.string().optional().nullable(),
  headers: z.array(Header).optional(),
  filters: z.array(z.any()).optional().nullable(),
  active: z.boolean(),
});

export const WebookCollectionSchema = z.object({
  sys: z.object({
    type: z.literal('Array'),
  }),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  items: z.array(WebhookSchema),
});
