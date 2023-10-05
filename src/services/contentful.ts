import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';
import {
  ModelResponseSchema,
  ModelSchema,
  allUsersSchema,
  environmentSchema,
  userSchema,
} from '../schemas/contentful';
import { EntryCollectionSchema, EntrySchema } from '../schemas/entry';
import { LocaleCollectionSchema, LocaleSchema } from '../schemas/locale';
import { SpaceCollectionSchema, SpaceSchema } from '../schemas/space';
import { WebhookSchema, WebookCollectionSchema } from '../schemas/webhook';
import { storage } from '../../App';
import { z } from 'zod';
import { MediaCollectionSchema, MediaSchema } from '../schemas/media';
import { Media } from '../components/icons/icons';

const CONTENTFUL_BASE_URL = 'https://api.contentful.com';

export namespace Hooks {
  export namespace beforeRequest {
    export function injectToken(): BeforeRequestHook {
      const unparsed = storage.getString('current-token');
      if (unparsed) {
        const token = JSON.parse(unparsed);

        console.log('before', token);
        return async (request: Request) => {
          request.headers.set('Authorization', `Bearer ${token.content}`);
        };
      }
      return async (request: Request) => {};
    }
  }

  export namespace afterResponse {
    export function logResponse(): AfterResponseHook {
      return async (request, _options, response) => {
        console.log(
          '[CONTENTFUL]: ',
          request.method,
          request.url.split('?')[0],
          response.status,
        );
      };
    }
  }
}

class ContentfulClient {
  private connection: KyInstance;

  init(): void {
    this.connection = ky.create({
      timeout: 10000,
      prefixUrl: CONTENTFUL_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      hooks: {
        beforeRequest: [Hooks.beforeRequest.injectToken()],
        afterResponse: [Hooks.afterResponse.logResponse()],
      },
    });
  }

  validateToken = async (
    token: string,
  ): Promise<{ valid: true; email: string } | { valid: false }> => {
    const data = await this.connection
      .get('users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    const validData = userSchema.parse(data);

    if (validData) {
      return { email: validData.email, valid: true };
    }
    return { valid: false };
  };

  Me = {
    get: async () => {
      const data = await this.connection.get('users/me').json();
      return userSchema.parse(data);
    },
  };

  Users = {
    getAll: async (space: string) => {
      const data = await this.connection.get(`spaces/${space}/users/`).json();
      return allUsersSchema.parse(data);
    },
    getById: async (space: string, id: string) => {
      const data = await this.connection
        .get(`spaces/${space}/users/${id}`)
        .json();
      return userSchema.parse(data);
    },
  };

  Webhooks = {
    getAll: async (space: string) => {
      const data = await this.connection
        .get(`spaces/${space}/webhook_definitions`)
        .json();
      return WebookCollectionSchema.parse(data);
    },
    getByID: async (spaceID: string, webhookID: string) => {
      const data = await this.connection
        .get(`spaces/${spaceID}/webhook_definitions/${webhookID}`)
        .json();
      return WebhookSchema.parse(data);
    },
    updateByID: async (
      spaceID: string,
      webhookID: string,
      data: Partial<Omit<z.infer<typeof WebhookSchema>, 'sys'>>,
      version: number,
    ) => {
      console.log({ data });
      const response = await this.connection
        .put(`spaces/${spaceID}/webhook_definitions/${webhookID}`, {
          json: data,
          headers: {
            'X-Contentful-Version': version,
          },
        })
        .json();
      return WebhookSchema.parse(response);
    },
    getHealthByID: async (spaceID: string, webhookID: string) => {
      const data = await this.connection
        .get(`spaces/${spaceID}/webhooks/${webhookID}/health`)
        .json();
    },
    deleteByID: async (spaceID: string, webhookID: string) => {
      const data = await this.connection.delete(
        `spaces/${spaceID}/webhook_definitions/${webhookID}`,
      );
    },
    create: async (spaceID: string, webhookID: string) => {
      const data = await this.connection.delete(
        `spaces/${spaceID}/webhook_definitions/${webhookID}`,
      );
    },
  };

  Spaces = {
    getAll: async () => {
      const data = await this.connection.get('spaces').json();
      return SpaceCollectionSchema.parse(data);
    },
    getById: async (spaceId?: string) => {
      const data = await this.connection.get(`spaces/${spaceId}`).json();
      return SpaceSchema.parse(data);
    },
  };

  Environment = {
    getAll: async (space?: string) => {
      const data = await this.connection
        .get(`spaces/${space}/environments`)
        .json();
      return environmentSchema.parse(data);
    },
  };

  Models = {
    getAll: async (space?: string, environment?: string) => {
      const data = await this.connection
        .get(`spaces/${space}/environments/${environment}/content_types`)
        .json();
      return ModelResponseSchema.parse(data);
    },
    getById: async (space?: string, environment?: string, modelID?: string) => {
      const data = await this.connection
        .get(
          `spaces/${space}/environments/${environment}/content_types/${modelID}`,
        )
        .json();
      return ModelSchema.parse(data);
    },
  };

  Entries = {
    getAll: async (space?: string, environment?: string) => {
      const data = await this.connection
        .get(
          `spaces/${space}/environments/${environment}/entries?limit=25&skip=0`,
        )
        .json();

      return EntryCollectionSchema.parse(data);
    },
    getById: async (space?: string, environment?: string, entryId?: string) => {
      const data = await this.connection
        .get(`spaces/${space}/environments/${environment}/entries/${entryId}`)
        .json();

      return EntrySchema.parse(data);
    },
  };

  Media = {
    getAll: async (space?: string, environment?: string) => {
      const data = await this.connection
        .get(`spaces/${space}/environments/${environment}/assets`)
        .json();

      return MediaCollectionSchema.parse(data);
    },
    getByID: async (space?: string, environment?: string, assetID?: string) => {
      const data = await this.connection
        .get(`spaces/${space}/environments/${environment}/assets/${assetID}`)
        .json();
      return MediaSchema.parse(data);
    },
  };

  Locales = {
    getAll: async (space?: string, environment?: string) => {
      const data = await this.connection
        .get(`spaces/${space}/environments/${environment}/locales`)
        .json();

      return LocaleCollectionSchema.parse(data);
    },
    getByID: async (
      space?: string,
      environment?: string,
      localeID?: string,
    ) => {
      const data = await this.connection
        .get(`spaces/${space}/environments/${environment}/locales/${localeID}`)
        .json();

      return LocaleSchema.parse(data);
    },
    updateByID: async (
      data: Partial<Omit<z.infer<typeof WebhookSchema>, 'sys'>>,
      version: number,
      space: string,
      environment: string,
      localeID: string,
    ) => {
      const response = await this.connection
        .put(
          `spaces/${space}/environments/${environment}/locales/${localeID}`,
          {
            json: data,
            headers: {
              'X-Contentful-Version': version,
              'Content-Type': 'application/vnd.contentful.management.v1+json',
            },
          },
        )
        .json();

      return LocaleSchema.parse(response);
    },
    deleteByID: async (
      space: string,
      environment: string,
      localeID: string,
    ) => {
      await this.connection.delete(
        `spaces/${space}/environments/${environment}/locales/${localeID}`,
      );
    },
  };
}

export const Contentful = new ContentfulClient();
