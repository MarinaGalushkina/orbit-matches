import { Avatar } from '@mui/material';
import { useDrag } from 'react-dnd';
import styles from './Participant.module.css';
import { Participant as ParticipantType } from '../../types';
export type ParticipantProps = {
  participant: ParticipantType;
  matchGroupId: string;
  draggable: boolean;
};

const Participant: React.FC<ParticipantProps> = ({
  participant,
  matchGroupId,
  draggable = false,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'PARTICIPANTS_MATCH',
      item: { matchGroupId, participant },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <div
      className={styles.matchParticipant}
      data-testid='participant-component'
      ref={draggable ? drag : null}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ? '1px solid orange' : 0,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      <Avatar>{`${participant.forename[0]}${participant.surname[0]}`}</Avatar>
      <div className={styles.participantInfo}>
        {participant.forename} {participant.surname}
      </div>
    </div>
  );
};

export default Participant;
