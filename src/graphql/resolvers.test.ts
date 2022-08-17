import { restoreOriginalMatches } from './resolvers';
import { MatchGroup, ParticipantsList } from '../types';
import matches from '../data/matches.json';
import participants from '../data/participants.json';
const testMatchGroupId = '765dad9c-09bb-49b0-9745-6ab244fc775b';

test('restores original matches from list of participants', () => {
  const originalMatches = matches.filter((match) => match.matchGroupId === testMatchGroupId);
  const testParticipantsList = originalMatches.reduce<ParticipantsList>((participantsList, match) => {
    match.participants.forEach((participantId) => {
      if (!participantsList[participantId]) {
        participantsList[participantId] = participants.find(
          (participant) => participant.id === participantId
        )!;
      }
    });
    return participantsList;
  }, {});
  const testMatchGroup: MatchGroup = {
    matchGroupId: testMatchGroupId,
    matches: [
      {
        matchGroupId: testMatchGroupId,
        score: 1,
        participants: Object.values(testParticipantsList),
      },
    ],
  };

  const matchesBeforeRestore = testMatchGroup.matches;

  restoreOriginalMatches(testMatchGroup);
  const matchesAfterRestore = testMatchGroup.matches;

  expect(matchesBeforeRestore.length).toBe(1);
  expect(matchesAfterRestore.length).toBe(originalMatches.length);
});
