import * as React from 'react';

type ListItemsProps = {
  initialItems: string[];
};

function ListItems({ initialItems }: ListItemsProps) {
  const [newItem, setNewItem] = React.useState('');
  const [list, setList] = React.useState(initialItems);

  function addToList() {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(setList([...list, newItem]));
      }, 500);
    });
  }

  function removeFromList(item: string) {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(setList(list.filter((i) => i !== item)));
      }, 500);
    });
  }

  return (
    <div className="App">
      <input
        data-testid="item-input"
        type="text"
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
      />

      <button onClick={addToList}>add new</button>

      <ul>
        {list.map((name, index) => (
          <li key={index}>
            {name}
            <button onClick={() => removeFromList(name)}>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListItems;
