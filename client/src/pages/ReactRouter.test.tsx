import { screen, render as rtlRender } from '@testing-library/react';
import { App } from '../App';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const render = (ui: any, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...rtlRender(ui, { wrapper: BrowserRouter }),
  };
};

describe('App', () => {
  test('full app rendering/navigating', async () => {
    const { user } = render(<App />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();

    await user.click(screen.getByText(/about/i));

    expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
  });

  test('landing on a bad page', () => {
    render(<App />, { route: '/something-that-does-not-match' });

    expect(screen.getByText(/no match/i)).toBeInTheDocument();
  });
});
