import { render, screen } from '@testing-library/react';
import { Error } from '@components/ui';
import { STATES } from '@/constants/messages';

describe('Error Component', () => {
  it('renders error message correctly', () => {
    render(<Error />);
    expect(screen.getByText(STATES.error)).toBeInTheDocument();
  });
});
