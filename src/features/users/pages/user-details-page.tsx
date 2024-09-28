import { Link, useParams } from 'react-router-dom';
import useGetUser from '@/features/users/hooks/use-get-user';
import { Section, Title } from '@/components/common';
import { CardUser } from '@/features/users/components';
import { Error, Loading } from '@/components/ui';
import { PAGE_ROUTES as ROUTES } from '@/routes/page-routes';

const UserDetailsPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user, isLoading, error } = useGetUser(username!);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Section>
      <Link to={ROUTES.USERS.INDEX} className="link link--back link--outline link--icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.939 4.939L6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"></path>
        </svg>
        Back
      </Link>
      <Title>Details of {username}</Title>
      {user && <CardUser user={user} />}
    </Section>
  );
};

export default UserDetailsPage;
