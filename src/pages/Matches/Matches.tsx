import { TableCell, TableRow } from '@mui/material';
import { useDrop } from 'react-dnd';
import styles from './Matches.module.css';
import {
  Match,
  Participant as ParticipantType,
  DraggableParticipant as DraggableParticipantType,
  ParticipantMovingData,
} from '../../types/';
import Participant from './Participant';

export type MatchesProps = {
  matches: Match[];
  matchGroupId: string;
  setParticipantMovingData: (data: ParticipantMovingData) => void;
  draggable?: boolean;
};

const Matches: React.FC<MatchesProps> = ({
  matches,
  matchGroupId,
  setParticipantMovingData,
  draggable = false,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'PARTICIPANTS_MATCH',
      drop: (item: DraggableParticipantType) => {
        if (item.matchGroupId !== matchGroupId) {
          setParticipantMovingData({
            participant: item.participant, // In some cases I would probably pass only id
            fromMatchGroupId: item.matchGroupId,
            toMatchGroupId: matchGroupId,
          });
        }
      },
      collect: (monitor) => {
        const draggableItem: DraggableParticipantType = monitor.getItem();
        return {
          isOver: !!monitor.isOver() && draggableItem.matchGroupId !== matchGroupId,
          draggedItem: draggableItem,
        };
      },
    }),
    []
  );

  return (
    <TableRow ref={draggable ? drop : null}>
      <TableCell
        style={{
          backgroundColor: isOver ? '#E7EBF0' : '',
        }}
        component="th"
      >
        {matches.map((match: Match) => {
          return (
            <div
              data-testid='match-component'
              className={styles.matchContainer}
              key={match.participants.map((p) => p.id).join('_')}
            >
              <div>
                {match.participants.map((participant: ParticipantType) => (
                  <Participant
                    key={participant.id}
                    participant={participant}
                    matchGroupId={match.matchGroupId}
                    draggable={draggable}
                  />
                ))}
              </div>
              <div className={styles.matchScore}>{match.score}</div>
            </div>
          );
        })}
      </TableCell>
    </TableRow>
  );
};

export default Matches;
