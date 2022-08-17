import { render, screen } from '@testing-library/react';
import Dialog, { DialogProps } from './Dialog';

const props: DialogProps = {
  closeDialog: () => {},
  open: true,
  title: 'Header for the Dialog',
  content: 'Dialog is open',
  buttons: [
    {
      title: 'Button',
      action: () => {},
    },
  ],
};

describe('Dialog Component', () => {
  test('renders a header in the Dialog', () => {
    render(<Dialog {...props} />);
    const linkHeader = screen.getByText(`${props.title}`);
    expect(linkHeader).toBeInTheDocument();
  });

  test('renders content in the Dialog', () => {
    render(<Dialog {...props} />);
    const linkBody = screen.getByText(`${props.content}`);
    expect(linkBody).toBeInTheDocument();
  });

  test('renders a button in the Dialog', () => {
    render(<Dialog {...props} />);
    const linkButton = screen.getByRole('button');
    expect(linkButton).toBeInTheDocument();
  });
});
