import { z } from 'zod';

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
  topics: z.array(z.string()),
  httpBasicUsername: z.string().nullable(),
  headers: z.array(Header).optional(),
  filters: z.array(z.any()).nullable(),
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
