import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Participant, { ParticipantProps } from './Participant';

const props:ParticipantProps = {
  participant: {
    id: 'id-1',
    forename: 'Alex',
    surname: 'Black',
  },
  matchGroupId: 'MatchGroupId',
  draggable: false,
};

describe('Participant Component', () => {
  render(
    <DndProvider backend={HTML5Backend}>
      <Participant {...props} />
    </DndProvider>
  );
  test('renders particimpat component', () => {
    const linkElement = screen.getByText('Alex Black');
    expect(linkElement).toBeInTheDocument();
  });
})

