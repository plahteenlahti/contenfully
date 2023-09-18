import { z } from 'zod';
import { Code } from './locale';

export const userSchema = z.object({
  sys: z.object({
    type: z.string(),
    id: z.string(),
    version: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  cookieConsentData: z.string().or(z.null()).optional(),
  firstName: z.string().or(z.null()).optional(),
  lastName: z.string().or(z.null()).optional(),
  avatarUrl: z.string().optional(),
  email: z.string(),
  activated: z.boolean(),
  signInCount: z.number(),
  confirmed: z.boolean(),
  '2faEnabled': z.boolean(),
});

export const allUsersSchema = z.object({
  total: z.number(),
  limit: z.number(),
  skip: z.number(),
  sys: z.object({
    type: z.string(),
  }),
  items: z.array(userSchema),
});

export const spaceSchema = z.object({
  sys: z.object({
    type: z.string(),
  }),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  items: z.array(
    z.object({
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
    }),
  ),
});

export const environmentSchema = z.object({
  sys: z.object({
    type: z.string(),
  }),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  items: z.array(
    z.object({
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
        space: z.object({
          sys: z.object({
            id: z.string(),
            linkType: z.string(),
            type: z.string(),
          }),
        }),
        status: z.object({
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
    }),
  ),
});

export const FieldType = z.union([
  z.literal('Symbol'),
  z.literal('Array'),
  z.literal('Text'),
  z.literal('RichText'),
  z.literal('Number'),
  z.literal('Integer'),
  z.literal('Boolean'),
  z.literal('Date'),
  z.literal('Location'),
  z.literal('Object'),
  z.literal('Link'),
]);

// Field validation schema
const FieldValidation = z.union([
  z.object({
    unique: z.boolean().optional(),
    regexp: z
      .object({
        pattern: z.string().optional(),
        flags: z.null().optional(),
      })
      .optional(),
    message: z.string().optional(),
  }),
]);

const Field = z.object({
  id: z.string(),
  name: z.string(),
  type: FieldType,
  localized: z.boolean(),
  required: z.boolean(),
  validations: z.array(FieldValidation),
  disabled: z.boolean(),
  omitted: z.boolean(),
});

export const Link = z.object({
  type: z.literal('Link'),
  linkType: z.string(),
  id: z.string(),
});

export const ModelSchema = z.object({
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
    publishedVersion: z.number(),
    publishedAt: z.string(),
    firstPublishedAt: z.string(),
    createdBy: z.object({
      sys: Link,
    }),
    updatedBy: z.object({
      sys: Link,
    }),
    publishedCounter: z.number(),
    version: z.number(),
    publishedBy: z.object({
      sys: Link,
    }),
  }),
  displayField: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  fields: z.array(Field),
});

export const ModelResponseSchema = z.object({
  sys: z
    .object({
      type: z.literal('Array').optional(),
    })
    .optional(),
  total: z.number().optional(),
  skip: z.number().optional(),
  limit: z.number().optional(),
  items: z.array(ModelSchema).optional(),
});
