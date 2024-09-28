import { render, screen } from '@testing-library/react';
import { CardUser } from '@/features/users/components';
import { formatDate } from '@/utils/dates';
import { MOCK_USER } from '@tests/__mocks__';

jest.mock('@/utils/dates', () => ({
  formatDate: jest.fn((date: string) => `Formatted: ${date}`),
}));

describe('CardUser Component', () => {
  beforeEach(() => {
    (formatDate as jest.Mock).mockClear();
  });

  it('should render the user details', () => {
    render(<CardUser user={MOCK_USER} />);
    if (MOCK_USER.name) {
      expect(screen.getByText(MOCK_USER.name)).toBeInTheDocument();
    }
    if (MOCK_USER.bio) {
      expect(screen.getByText(MOCK_USER.bio)).toBeInTheDocument();
    }
    expect(
      screen.getByText((_, element) => {
        return element?.textContent === `Username: ${MOCK_USER.login}`;
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => {
        return element?.textContent === `Public Repositories: ${MOCK_USER.public_repos}`;
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => {
        return element?.textContent === `Followers: ${MOCK_USER.followers}`;
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => {
        return element?.textContent === `Following: ${MOCK_USER.following}`;
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => {
        return element?.textContent === `Joined GitHub on: Formatted: ${MOCK_USER.created_at}`;
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => {
        return element?.textContent === `Last Updated: Formatted: ${MOCK_USER.updated_at}`;
      })
    ).toBeInTheDocument();
  });

  it('renders the user image with correct src and alt attributes', () => {
    render(<CardUser user={MOCK_USER} />);
    const image = screen.getByText((_, element) => element!.tagName.toLowerCase() === 'img');
    expect(image).toHaveAttribute('src', MOCK_USER.avatar_url);
    expect(image).toHaveAttribute('alt', MOCK_USER.login);
  });
});
