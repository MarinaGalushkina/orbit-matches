import { ReactNode } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export type DialogProps = {
  closeDialog: () => void;
  open: boolean;
  title?: string;
  content: ReactNode | string;
  buttons: ButtonType[];
};

type ButtonType = {
  title: string;
  action: () => void;
  autoFocus?: boolean;
};

const DialogComponent: React.FC<DialogProps> = ({
  buttons,
  closeDialog,
  open,
  title = '',
  content,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {buttons.map(({ title, action, autoFocus }: ButtonType) => (
            <Button key={title} autoFocus={autoFocus} onClick={action}>
              {title}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogComponent;
