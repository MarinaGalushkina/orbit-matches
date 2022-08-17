export type MatchGroups = {
  [key: string]: MatchGroup;
};

export type MatchGroup = {
  matchGroupId: string;
  matches: Match[];
};

export type Match = {
  matchGroupId: string;
  score: number | null;
  participants: Participant[];
};

export type Participant = {
  id: string;
  surname: string;
  forename: string;
};

export type DraggableParticipant = {
  participant: Participant;
  matchGroupId: string;
};

export type ParticipantsList = {
  [id: string]: Participant;
};

export type ParticipantMovingData = {
  participant: Participant | null;
  fromMatchGroupId: string;
  toMatchGroupId: string;
};
