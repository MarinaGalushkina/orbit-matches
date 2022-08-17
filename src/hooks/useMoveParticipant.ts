import { gql, useMutation, Reference, ApolloCache, NormalizedCache } from '@apollo/client';
import { MatchGroup } from '../types';

const useMoveParticipant = () => {
  const [moveParticipant] = useMutation(
    gql`
      mutation moveParticipant($participantId: String!, $fromMatchGroupId: String!, $toMatchGroupId: String!) {
        moveParticipant(
          participantId: $participantId
          fromMatchGroupId: $fromMatchGroupId
          toMatchGroupId: $toMatchGroupId
        ) {
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
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            matchGroups(existingMatchGroups = [], { readField }) {
              const matchGroupFromRef = getCacheRef(cache, data.moveParticipant[0]);
              const matchGroupToRef = getCacheRef(cache, data.moveParticipant[1]);

              return existingMatchGroups.map((ref: Reference) => {
                const matchGroupId = readField('matchGroupId', ref);

                if (matchGroupId === readField('matchGroupId', matchGroupFromRef)) {
                  return matchGroupFromRef;
                }

                if (matchGroupId === readField('matchGroupId', matchGroupToRef)) {
                  return matchGroupToRef;
                }

                return ref;
              });
            },
          },
        });
      },
    }
  );

  return (participantId: string, fromMatchGroupId: string, toMatchGroupId: string) => {
    return moveParticipant({
      variables: { participantId, fromMatchGroupId, toMatchGroupId },
    });
  };
};

function getCacheRef(cache: ApolloCache<NormalizedCache>, data: MatchGroup) {
  return cache.writeFragment({
    id: cache.identify(data),
    data: data,
    fragment: gql`
      fragment NewMatchGroup on MatchGroups {
        matchGroupId
        matches {
          matchGroupId
          participants {
            id
            surname
            forename
          }
        }
      }
    `,
  });
}

export default useMoveParticipant;
