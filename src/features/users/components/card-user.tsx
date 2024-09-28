import { User } from '@/features/users/types';
import { formatDate } from '@/utils/dates';

const CardUser: React.FC<{ user: User }> = ({ user }) => {
  return (
    <article className="card card--details">
      <img src={user.avatar_url} alt={user.login} className="card__image" />
      <div className="card__body">
        <h1 className="card__title">{user.name}</h1>
        <p className="card__desc">{user.bio}</p>
        <p>
          <strong>Username:</strong> {user.login}
        </p>
        <p>
          <strong>Public Repositories:</strong> {user.public_repos}
        </p>
        <p>
          <strong>Followers:</strong> {user.followers}
        </p>
        <p>
          <strong>Following:</strong> {user.following}
        </p>
        <p>
          <strong>Joined GitHub on:</strong> {formatDate(user.created_at)}
        </p>
        <p>
          <strong>Last Updated:</strong> {formatDate(user.updated_at)}
        </p>
      </div>
    </article>
  );
};

export default CardUser;
