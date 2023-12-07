import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../../App';
import {}


// A custom provider, not the AuthProvider, to test it in isolation.
// This customRender will be a fake AuthProvider, one that I can controll to abstract of AuthProvider issues.

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};