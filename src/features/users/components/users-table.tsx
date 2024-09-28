import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '@/features/users/types/user';
import { PAGE_ROUTES as ROUTES } from '@/routes/page-routes';
import { STATES } from '@/constants/messages';

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const navigate = useNavigate();

  const handleRowClick = useCallback(
    (username: string) => {
      navigate(ROUTES.USERS.DETAILS(username));
    },
    [navigate]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTableRowElement>, username: string) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleRowClick(username);
      }
    },
    [handleRowClick]
  );

  return (
    <div
      style={{
        minWidth: '100%',
        overflowX: 'auto',
      }}
    >
      <table className="table">
        <thead className="table__thead">
          <tr className="table__tr">
            <th data-th="#" className="table__th table__th--center">
              #
            </th>
            <th data-th="id" className="table__th table__th--center">
              ID
            </th>
            <th data-th="name" className="table__th">
              Name
            </th>
            <th data-th="username" className="table__th">
              Username
            </th>
            <th data-th="url" className="table__th table__th--center">
              URL
            </th>
          </tr>
        </thead>
        <tbody className="table__tbody">
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="table__td table__td--center">
                {STATES.empty}
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user.login)}
                onKeyDown={(event) => handleKeyDown(event, user.login)}
                role="button"
                tabIndex={0}
                className="table__tr"
                title={`Show details of ${user.login}`}
                style={{ cursor: 'pointer', '--delay': index } as React.CSSProperties}
              >
                <td className="table__td table__td--center">{index + 1}</td>
                <td className="table__td table__td--center">{user.id}</td>
                <td className="table__td">{user.name}</td>
                <td className="table__td">{user.login}</td>
                <td className="table__td table__td--center">
                  <Link to={ROUTES.USERS.DETAILS(user.login)} className="table__link">
                    Show details
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
