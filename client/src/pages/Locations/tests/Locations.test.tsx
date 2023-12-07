import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Locations } from '../Locations';

describe('Locations', () => {
  it('should render the component', async () => {
    const { getByText } = render(<Locations />);
    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('should render the component with error', async () => {
    const error = 'Error fetching data';
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error(error));
    const { getByText } = render(<Locations />);
    await waitFor(() => {
      expect(getByText(`Error: ${error}`)).toBeInTheDocument();
    });
  });

  it('should render the component with map center', async () => {
    const { getByText } = render(<Locations />);
    await waitFor(() => {
      expect(getByText('API is not loaded yet')).toBeInTheDocument();
    });
  });

  // Add more tests for other functionality in the Locations component
});
