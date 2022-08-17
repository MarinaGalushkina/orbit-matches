import { Fragment } from 'react';
import Dialog from '../../components/Dialog';

export type PopupProps = {
  closePopup: () => void;
  confirmParticipantMoving: () => void;
  open: boolean;
  allowedToBeMoved?: boolean;
  participantName?: string;
};

const Popup: React.FC<PopupProps> = ({
  allowedToBeMoved,
  closePopup,
  open,
  confirmParticipantMoving,
  participantName,
}) => {
  const getDialogContent = () => {
    if (allowedToBeMoved) {
      return (
        <Fragment>
          Do you want to move <b>{participantName}</b> to another group?
        </Fragment>
      );
    } else {
      return <Fragment>There must be at least two people in the matches group.</Fragment>;
    }
  };

  const getButtons = () => {
    if (allowedToBeMoved) {
      return [
        {
          title: 'Cancel',
          action: closePopup,
        },
        {
          title: 'Confirm',
          action: confirmParticipantMoving,
          autoFocus: true,
        },
      ];
    } else {
      return [
        {
          title: 'Ok',
          action: closePopup,
        },
      ];
    }
  };

  return (
    <Dialog
      closeDialog={closePopup}
      open={open}
      content={getDialogContent()}
      buttons={getButtons()}
    />
  );
};

export default Popup;
