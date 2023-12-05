import { render, screen } from '@testing-library/react';
import { Home } from './Home';

describe('Home page renders title', () => {
  it('should render without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });
});
