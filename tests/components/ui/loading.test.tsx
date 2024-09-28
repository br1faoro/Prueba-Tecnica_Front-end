import { render, screen } from '@testing-library/react';
import { Loading } from '@components/ui';
import { STATES } from '@/constants/messages';

describe('Loading Component', () => {
  it('renders loading message correctly', () => {
    render(<Loading />);
    expect(screen.getByText(STATES.loading)).toBeInTheDocument();
  });
});
