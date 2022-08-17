import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = `
  type Query {
    matchGroups: [MatchGroup!]
  }

  type Mutation {
    moveParticipant(participantId: String!, fromMatchGroupId: String!, toMatchGroupId: String!): [MatchGroup!]
  }

  type MatchGroup {
    matchGroupId : ID! 
    matches: [Match!]
  }

  type Match {
    matchGroupId : ID!
    score: Float
    participants: [Participant]
  }

  type Participant {
    id: ID!
    surname: String!
    forename: String!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  typeDefs,
});
