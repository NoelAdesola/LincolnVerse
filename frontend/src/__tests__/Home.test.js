import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

test('renders search input', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(screen.getByPlaceholderText(/search media/i)).toBeInTheDocument();
});


test('enables search button when typing ≥3 chars', () => {
  render(
    <BrowserRouter>
      <Home user={null} />
    </BrowserRouter>
  );
  const input = screen.getByPlaceholderText(/search media/i);
  fireEvent.change(input, { target: { value: 'cat' } });
  expect(screen.getByRole('button', { name: /search/i })).not.toBeDisabled();
});
