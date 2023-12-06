import { render, screen } from '@testing-library/react';
import { About } from '../About';

describe('About page renders title', () => {
  it('should render without crashing', () => {
    render(<About />);
    expect(screen.getByText(/About Page/)).toBeInTheDocument();
  });
});
