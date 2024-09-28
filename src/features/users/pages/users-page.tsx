import { Section, Title } from '@components/common';
import { useUsers } from '@features/users/hooks/use-users';
import { UsersSearchForm, UsersTable, UsersFollowersChart } from '@features/users/components';
import { Loading, Error } from '@components/ui';

const UsersPage: React.FC = () => {
  const { users, isLoading, error, handleSearch } = useUsers();

  return (
    <Section>
      <Title>Unow Front-end Test</Title>
      <UsersSearchForm onSearch={handleSearch} />
      {isLoading && <Loading />}
      {error && <Error />}
      {!isLoading && !error && (
        <>
          <UsersTable users={users} />
          <UsersFollowersChart users={users} />
        </>
      )}
    </Section>
  );
};

export default UsersPage;
