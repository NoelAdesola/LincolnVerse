import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MediaDetail from '../pages/MediaDetail';
import * as api from '../services/api';

jest.mock('../services/api');

test('loads and displays media detail', async () => {
  api.getMediaDetails.mockResolvedValue({ data: { id: '123', title: 'Test', url: 'http://...' } });

  render(
    <MemoryRouter initialEntries={['/media/images/123']}>
      <Routes>
        <Route path="/media/:type/:id" element={<MediaDetail user={{ id:1 }} />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByText(/test/i)).toBeInTheDocument();
});
