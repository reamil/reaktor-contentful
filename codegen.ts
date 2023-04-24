import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'https://graphql.contentful.com/content/v1/spaces/hsg986itelz1': {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    },
  },
  documents: 'src/**/*.tsx',
  ignoreNoDocuments: true,
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
