import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FoodMenu from './Menu';

describe('FoodMenu', () => {
  test('component renders without crashing', () => {
    render(<FoodMenu items={[]} title="snack" />);
  });

  test('component creates and displays links if there are items in the "items" prop and the "title" prop is "snack"', () => {
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];

    const { getAllByRole } = render(
      <Router>
        <FoodMenu items={items} title="snack" />
      </Router>
    );

    const links = getAllByRole('link');

    // Assert that the correct number of links is rendered
    expect(links.length).toBe(items.length);

    // Assert that each link has the correct href
    items.forEach((item, index) => {
      expect(links[index]).toHaveProperty(
        'href',
        `http://localhost/snack/${item.id}`
      );
    });

    // Assert that each link displays the correct item name
    items.forEach((item, index) => {
      expect(links[index].textContent).toContain(item.name);
    });
  });
});
