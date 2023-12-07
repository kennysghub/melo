import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { NavbarLink } from '../NavbarLink';

describe('NavbarLink', () => {
  it('renders the link with the correct href and children', () => {
    const testText = 'Test Link';
    const testHref = '/test-route';

    render(
      <BrowserRouter>
        <NavbarLink to={testHref}>{testText}</NavbarLink>
      </BrowserRouter>
    );

    const linkElement = screen.getByRole('navigation');
    expect(linkElement).toHaveTextContent(testText);
    expect(linkElement.getAttribute('href')).toBe(testHref);
  });
});
