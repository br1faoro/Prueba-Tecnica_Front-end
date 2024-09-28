import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { UsersTable } from '@/features/users/components';
import { PAGE_ROUTES as ROUTES } from '@/routes/page-routes';
import { STATES } from '@/constants/messages';
import { MOCK_USER_ARRAY } from '@tests/__mocks__';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('UsersTable', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders the table with users', () => {
    render(
      <MemoryRouter>
        <UsersTable users={MOCK_USER_ARRAY} />
      </MemoryRouter>
    );
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('URL')).toBeInTheDocument();
    MOCK_USER_ARRAY.forEach((user, index) => {
      const row = screen.getByText(user.name!).closest('tr');
      expect(row).toHaveTextContent(user.name!);
      expect(row).toHaveTextContent(user.login);
      expect(row).toHaveTextContent((index + 1).toString());
    });
    const showDetailsButtons = screen.getAllByText('Show details');
    expect(showDetailsButtons).toHaveLength(MOCK_USER_ARRAY.length);
  });

  it('navigates to user details on row click', async () => {
    render(
      <MemoryRouter>
        <UsersTable users={MOCK_USER_ARRAY} />
      </MemoryRouter>
    );
    const firstRow = screen.getByText('John Doe').closest('tr') as HTMLElement;
    await userEvent.click(firstRow);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.USERS.DETAILS('johnDoe'));
  });

  it('navigates to user details on Enter key press', async () => {
    render(
      <MemoryRouter>
        <UsersTable users={MOCK_USER_ARRAY} />
      </MemoryRouter>
    );
    const firstRow = screen.getByText('John Doe').closest('tr') as HTMLElement;
    firstRow.focus();
    await userEvent.keyboard('{enter}');
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.USERS.DETAILS('johnDoe'));
  });

  it('navigates to user details on Space key press', async () => {
    render(
      <MemoryRouter>
        <UsersTable users={MOCK_USER_ARRAY} />
      </MemoryRouter>
    );
    const firstRow = screen.getByText('John Doe').closest('tr') as HTMLElement;
    firstRow.focus();
    await userEvent.keyboard(' ');
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.USERS.DETAILS('johnDoe'));
  });

  it('renders links correctly', () => {
    render(
      <MemoryRouter>
        <UsersTable users={MOCK_USER_ARRAY} />
      </MemoryRouter>
    );
    MOCK_USER_ARRAY.forEach((user) => {
      const link = screen
        .getAllByText('Show details')
        .find((l) => (l as HTMLAnchorElement).getAttribute('href') === ROUTES.USERS.DETAILS(user.login));
      expect(link).toBeInTheDocument();
    });
  });

  it('has accessible roles and attributes', () => {
    render(
      <MemoryRouter>
        <UsersTable users={MOCK_USER_ARRAY} />
      </MemoryRouter>
    );
    MOCK_USER_ARRAY.forEach((user) => {
      const row = screen.getByText(user.name!).closest('tr');
      expect(row).toHaveAttribute('role', 'button');
      expect(row).toHaveAttribute('tabindex', '0');
      expect(row).toHaveAttribute('title', `Show details of ${user.login}`);
    });
  });

  it('renders a message if no users are passed', () => {
    render(
      <MemoryRouter>
        <UsersTable users={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText(STATES.empty)).toBeInTheDocument();
  });
});
