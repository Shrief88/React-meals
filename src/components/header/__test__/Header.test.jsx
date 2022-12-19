import { test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header component', () => {
  test('render the correct header', () => {
    render(<Header />);
    const headerElement = screen.getByRole('heading');
    expect(headerElement.textContent).toMatch(/reactmeals/i);
  });
});
