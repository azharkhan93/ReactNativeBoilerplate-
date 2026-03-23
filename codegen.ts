import { CodegenConfig } from '@graphql-codegen/cli';
import { GRAPHQL_API_URL } from './utils/api';

const config: CodegenConfig = {
  schema: GRAPHQL_API_URL,
  documents: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  generates: {
    './__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
