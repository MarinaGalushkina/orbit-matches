import matches from '../matches.json';
import participantsArr from '../participants.json';
import { MatchGroups, ParticipantsList } from '../../types';

export function getParticipantList(): ParticipantsList {
  return participantsArr.reduce<ParticipantsList>((acc, participant) => {
    acc[participant.id] = participant;
    return acc;
  }, {});
}

export function getMatchesByGroups(
  participantsList: ParticipantsList
): MatchGroups {
  return matches.reduce<MatchGroups>((matchGroups, match) => {
    if (matchGroups[match.matchGroupId]) {
      matchGroups[match.matchGroupId].matches.push({
        matchGroupId: match.matchGroupId,
        score: match.score,
        participants: match.participants.map(
          (participantId) => participantsList[participantId]
        ),
      });
    } else {
      matchGroups[match.matchGroupId] = {
        matchGroupId: match.matchGroupId,
        matches: [
          {
            matchGroupId: match.matchGroupId,
            score: match.score,
            participants: match.participants.map(
              (participantId) => participantsList[participantId]
            ),
          },
        ],
      };
    }
    return matchGroups;
  }, {});
}
