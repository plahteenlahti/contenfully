import ky, { AfterResponseHook } from 'ky';
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
import { WebookCollectionSchema } from '../schemas/webhook';

const CONTENTFUL_BASE_URL = 'https://api.contentful.com';

export namespace Hooks {
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

  init(token: string): void {
    this.connection = ky.create({
      timeout: 10000,
      prefixUrl: CONTENTFUL_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ky,
        hooks: {
          afterResponse: [Hooks.afterResponse.logResponse()],
        },
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
    getById: () => {},
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

  Assets = {
    getAll: async (space?: string, environment?: string) => {
      const data = await this.connection.get(
        `spaces/${space}/environments/${environment}/assets`,
      );
    },
    getByID: async (space?: string, environment?: string, assetID?: string) => {
      const data = await this.connection.get(
        `spaces/${space}/environments/${environment}/assets/${assetID}`,
      );
    },
  };

  Locale = {
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
  };
}

export const Contentful = new ContentfulClient();
