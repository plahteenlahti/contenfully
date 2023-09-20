import { z } from 'zod';

export type Media = {
  metadata: {
    tags: [];
  };
  sys: {
    space: {
      sys: Link;
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: Link;
    };
    publishedVersion: number;
    publishedAt: string;
    firstPublishedAt: string;
    createdBy: {
      sys: Link;
    };
    updatedBy: {
      sys: Link;
    };
    publishedCounter: number;
    version: number;
    publishedBy: {
      sys: Link;
    };
  };
  fields: {
    title: {
      [key in LocaleCode]: string;
    };
    file: {
      [key in LocaleCode]: {
        url: string;
        details: {
          size: number;
          image: {
            width: number;
            height: number;
          };
        };
        fileName: string;
        contentType: string;
      };
    };
  };
};

type Response = {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: Media[];
};

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

const MediaSchema = z.object({
  metadata: z.object({
    tags: z.array(z.any()), // Specify item type of array if known
  }),
  sys: Sys,
  fields: z.object({
    title: z.record(LocaleCode, z.string()),
    file: z.record(LocaleCode, FileSchema),
  }),
});

const MediaCollectionSchema = z.object({
  sys: z.object({
    type: z.string(),
  }),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  items: z.array(MediaSchema),
});
