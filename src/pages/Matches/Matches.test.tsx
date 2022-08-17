import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Matches, { MatchesProps } from './Matches';
import { getParticipantList, getMatchesByGroups } from '../../data/helpers';
const participantsList = getParticipantList();
const matchGroups = getMatchesByGroups(participantsList);
const testMatchGroupId = '765dad9c-09bb-49b0-9745-6ab244fc775b';
const matchGroup = matchGroups[testMatchGroupId];

const props: MatchesProps = {
  matches: matchGroup.matches,
  matchGroupId: matchGroup.matchGroupId,
  setParticipantMovingData: () => {},
  draggable: false,
};

describe('Matches component test', () => {
  function renderComponent(props: MatchesProps) {
    render(
      <DndProvider backend={HTML5Backend}>
        <table>
          <tbody>
            <Matches {...props} />
          </tbody>
        </table>
      </DndProvider>
    );
  }

  test('renders list of matches', () => {
    renderComponent(props);
    const linkElements = screen.getAllByTestId('match-component');
    expect(linkElements.length).toBe(matchGroup.matches.length);
  });

  test('renders participants in a match', () => {
    renderComponent(props);
    const linkElements = screen.getAllByTestId('participant-component');
    expect(linkElements.length).toBe(matchGroup.matches.length * 2);
  });
});
