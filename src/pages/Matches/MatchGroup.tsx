import { useEffect, useState } from 'react';
import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import {
  MatchGroup as MatchGroupType,
  Match as MatchType,
  ParticipantMovingData,
} from '../../types';
import useFetchMatches from '../../hooks/useFetchMatches';
import useMoveParticipant from '../../hooks/useMoveParticipant';
import Matches from './Matches';
import Popup, { PopupProps } from './Popup';
import styles from './MatchGroup.module.css';

const initParticipantMovingDataState = {
  participant: null,
  fromMatchGroupId: '',
  toMatchGroupId: '',
};

const MatchGroup = () => {
  const [open, setOpen] = useState(false);
  const [participantMovingData, setParticipantMovingData] = useState<ParticipantMovingData>(
    initParticipantMovingDataState
  );

  useEffect(() => {
    if (!participantMovingData.participant) return;

    setOpen(true);
  }, [participantMovingData]);

  const moveParticipant = useMoveParticipant();

  const closePopup = () => {
    setOpen(false);
    setParticipantMovingData(initParticipantMovingDataState);
  };

  const confirmParticipantMoving = () => {
    if (!participantMovingData.participant) return;
    setOpen(false);
    moveParticipant(
      participantMovingData.participant.id,
      participantMovingData.fromMatchGroupId,
      participantMovingData.toMatchGroupId
    );
  };

  const getPopupProps = (): PopupProps => {
    const popupProps = {
      closePopup,
      confirmParticipantMoving,
      open,
      allowedToBeMoved: false,
      participantName: '',
    };
    if (open && participantMovingData.participant) {
      const { matches } = matchGroups.find(
        (matchGroup: MatchGroupType) =>
          matchGroup.matchGroupId === participantMovingData.fromMatchGroupId
      )!;
      const amountOfParticipants = matches.reduce(
        (amountOfParticipants: number, match: MatchType) => {
          amountOfParticipants += match.participants.length;
          return amountOfParticipants;
        },
        0
      );
      if (amountOfParticipants > 2) {
        popupProps.allowedToBeMoved = true;
        const { forename, surname } = participantMovingData.participant;
        popupProps.participantName = `${forename} ${surname}`;
      }
    }
    return popupProps;
  };

  const { loading, error, data } = useFetchMatches();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { matchGroups } = data;

  return (
    <div className={styles.matchesGroupContainer}>
      <TableContainer component={Paper}>
        <Table stickyHeader className={styles.matchesTable}>
          <TableBody>
            {matchGroups.map((matchGroup: MatchGroupType) => (
              <Matches
                key={matchGroup.matchGroupId}
                matches={matchGroup.matches}
                matchGroupId={matchGroup.matchGroupId}
                setParticipantMovingData={setParticipantMovingData}
                draggable={true}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup {...getPopupProps()} />
    </div>
  );
};

export default MatchGroup;
