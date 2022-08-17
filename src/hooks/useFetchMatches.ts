import { gql, useQuery } from '@apollo/client';

const useFetchMatches = () => {
  return useQuery(
    gql`
      query MatchGroups {
        matchGroups {
          matchGroupId
          matches {
            matchGroupId
            score
            participants {
              id
              surname
              forename
            }
          }
        }
      }
    `,
    { nextFetchPolicy: 'cache-first' }
  );
};

export default useFetchMatches;
