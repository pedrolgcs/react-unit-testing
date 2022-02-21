import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListItems from '../../components/ListIItems/ListItems';

type makeSutParams = {
  initialItems?: string[];
};

function makeSut({ initialItems = [] }: makeSutParams) {
  return render(<ListItems initialItems={initialItems} />);
}

describe('[Component] - ListItems', () => {
  it('should render list items', () => {
    const { getByText } = makeSut({
      initialItems: ['Diego', 'Lucas', 'Matheus'],
    });

    expect(getByText('Diego')).toBeInTheDocument();
    expect(getByText('Lucas')).toBeInTheDocument();
    expect(getByText('Matheus')).toBeInTheDocument();
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByTestId } = makeSut({});

    const itemInput = getByTestId('item-input');
    const addButton = getByText('add new');
    userEvent.type(itemInput, 'peter');
    userEvent.click(addButton);

    await waitFor(() => expect(getByText('peter')).toBeInTheDocument());
  });

  it('should be able to remove a item from list', async () => {
    const { queryByText, getAllByText, findByText } = makeSut({
      initialItems: ['Diego'],
    });

    const removeButtons = getAllByText('remove');
    userEvent.click(removeButtons[0]);

    await waitForElementToBeRemoved(() => queryByText('Diego'));
  });
});
