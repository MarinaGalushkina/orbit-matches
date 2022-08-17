import { ApolloClient, InMemoryCache} from '@apollo/client';
import { addMocksToSchema } from '@graphql-tools/mock';
import { SchemaLink } from '@apollo/client/link/schema'; // To mock the server
import schema from './schema';
import resolvers from './resolvers';

const schemaWithMocks = addMocksToSchema({
  schema,
  resolvers,
});

export default new ApolloClient({
  link: new SchemaLink({ schema: schemaWithMocks }),
  cache: new InMemoryCache({
    typePolicies: {
      MatchGroup: {
        keyFields: ['matchGroupId'],
        fields: {
          matches: {
            merge(existing, incoming = []) {
              return [...incoming];
            }
          }
        }
      }
    }
  }),
});

