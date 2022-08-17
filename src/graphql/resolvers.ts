import matches from '../data/matches.json';
import { MatchGroup, ParticipantsList } from '../types';
import { getParticipantList, getMatchesByGroups } from '../data/helpers';

type ParticipantMovingParams = {
  participantId: string;
  fromMatchGroupId: string;
  toMatchGroupId: string;
};

const participantsList = getParticipantList();
const matchGroups = getMatchesByGroups(participantsList);

const resolvers = {
  Query: {
    matchGroups() {
      return Object.values(matchGroups);
    },
  },
  Mutation: {
    moveParticipant(
      _: null,
      { participantId, fromMatchGroupId, toMatchGroupId }: ParticipantMovingParams
    ) {
      const matchGroupFrom = matchGroups[fromMatchGroupId];
      const participantsInFrom = matchGroupFrom.matches.reduce<ParticipantsList>(
        (participants, match) => {
          match.participants.forEach((participant) => {
            if (participant.id !== participantId) participants[participant.id] = participant;
          });

          return participants;
        },
        {}
      );
      const newMatchGroupFrom: MatchGroup = {
        matchGroupId: fromMatchGroupId,
        matches: [
          {
            matchGroupId: fromMatchGroupId,
            score: null,
            participants: Object.values(participantsInFrom),
          },
        ],
      };
      // Check if there are original matches after the moving
      restoreOriginalMatches(newMatchGroupFrom);
      matchGroups[fromMatchGroupId] = newMatchGroupFrom;

      const matchGroupTo = matchGroups[toMatchGroupId];
      const participantsInTo = matchGroupTo.matches.reduce<ParticipantsList>(
        (participants, match) => {
          match.participants.forEach((participant) => {
            participants[participant.id] = participant;
          });

          return participants;
        },
        { [participantId]: participantsList[participantId] }
      );
      const newMatchGroupTo: MatchGroup = {
        matchGroupId: toMatchGroupId,
        matches: [
          {
            matchGroupId: toMatchGroupId,
            score: null,
            participants: Object.values(participantsInTo),
          },
        ],
      };
      // Check if there are original matches after the moving
      restoreOriginalMatches(newMatchGroupTo);
      matchGroups[toMatchGroupId] = newMatchGroupTo;
      return [newMatchGroupFrom, newMatchGroupTo];
    },
  },
};

export function restoreOriginalMatches(newMatchGroup: MatchGroup): void {
  if (newMatchGroup.matches.length === 1) {
    const {matchGroupId} = newMatchGroup;
    const newMatchParticipants = newMatchGroup.matches[0].participants;
    // Compare original matchGroup and the new one
    const originalMatches = matches.filter((match) => match.matchGroupId === matchGroupId);
    const participantsFromOriginSet = new Set(); // Set to avoid duplicates
    originalMatches.forEach((match) =>
      match.participants.forEach((participantId) => participantsFromOriginSet.add(participantId))
    );
    const participantsFromOrigin = Array.from(participantsFromOriginSet);
    if (participantsFromOrigin.length === newMatchParticipants.length) {
      let originalSetOfParticipants = true;

      newMatchParticipants.forEach((participant) => {
        if (!participantsFromOrigin.some((participantId) => participantId === participant.id))
          originalSetOfParticipants = false;
      });

      if (originalSetOfParticipants) {
        newMatchGroup.matches = originalMatches.map((match) => {
          const participants = match.participants.map(
            (participantId) => participantsList[participantId]
          );
          return {
            ...match,
            participants,
          };
        });
      }
    }
  }
}

export default resolvers;
