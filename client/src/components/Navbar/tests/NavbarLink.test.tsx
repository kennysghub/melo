import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NavbarLink } from '../NavbarLink';

test('NavbarLink', () => {
  beforeAll(() => {
    render(
      <MemoryRouter>
        <NavbarLink to="/home">Home</NavbarLink>
      </MemoryRouter>
    );
  });

  expect(screen.findByRole('navigation')).toBeInTheDocument();
  expect(screen.getByText('Home')).toBeInTheDocument();
});
