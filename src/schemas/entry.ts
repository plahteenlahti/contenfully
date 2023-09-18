import { z } from 'zod';
import { SpaceSchema } from './space';

const FieldName = z.string();

const Locale = z.union([
  z.literal('en-US'),
  z.literal('fr-FR'),
  z.literal('de-DE'),
  z.literal('es-ES'),
  z.literal('it-IT'),
  z.literal('ja-JP'),
  z.literal('ko-KR'),
  z.literal('pt-BR'),
  z.literal('ru-RU'),
  z.literal('zh-CN'),
  z.literal('zh-TW'),
  z.literal('cz-CZ'),
]);

const Link = z.object({
  type: z.literal('Link'),
  linkType: z.string(),
  id: z.string(),
});

// type Field = {
//   [key: string]: {
//     [locale: string]: string | Link | array[Link]
//   }
// }

const Field = z
  .record(z.record(z.union([z.string(), Link, z.array(Link)])))
  .refine(
    data => Object.keys(data).every(key => Locale.safeParse(key).success),
    {
      message: 'Invalid locale key',
    },
  );

// Entry Schema
export const EntrySchema = z.lazy(() =>
  z.object({
    metadata: z.object({
      tags: z.array(z.any()),
    }),
    fields: z.record(
      z.record(z.union([z.any(), z.string(), Link, z.array(Link)])),
    ),
    sys: z.object({
      space: z.object({
        sys: Link,
      }),
      id: z.string(),
      type: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      environment: z.object({
        sys: Link,
      }),
      publishedVersion: z.number().optional(),
      publishedAt: z.string().optional(),
      firstPublishedAt: z.string(),
      createdBy: z.object({
        sys: Link,
      }),
      updatedBy: z.object({
        sys: Link,
      }),
      publishedCounter: z.number(),
      version: z.number(),
      publishedBy: z
        .object({
          sys: Link,
        })
        .optional(),
      contentType: z.object({
        sys: Link,
      }),
    }),
  }),
);

export const EntryCollectionSchema = z.object({
  sys: z.object({
    type: z.string(),
  }),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  items: z.array(EntrySchema),
});

export type Entry = z.infer<typeof EntrySchema>;
