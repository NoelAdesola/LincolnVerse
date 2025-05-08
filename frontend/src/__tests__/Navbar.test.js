import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { BrowserRouter } from 'react-router-dom';

test('shows Login & Sign Up when not authenticated', () => {
  render(
    <BrowserRouter>
      <Navbar user={null} setUser={() => {}} />
    </BrowserRouter>
  );
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.getByText(/sign up/i)).toBeInTheDocument();
});
