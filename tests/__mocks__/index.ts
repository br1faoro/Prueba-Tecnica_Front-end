import { User } from '@/features/users/types';

export const MOCK_USER: User = {
  login: 'johnDoe',
  id: 123456,
  node_id: 'MDQ6VXNlcjEyMzQ1Ng==',
  avatar_url: 'https://example.com/avatar.jpg',
  gravatar_id: '',
  url: 'https://api.github.com/users/johnDoe',
  html_url: 'https://github.com/johnDoe',
  followers_url: 'https://api.github.com/users/johnDoe/followers',
  following_url: 'https://api.github.com/users/johnDoe/following{/other_user}',
  gists_url: 'https://api.github.com/users/johnDoe/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/johnDoe/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/johnDoe/subscriptions',
  organizations_url: 'https://api.github.com/users/johnDoe/orgs',
  repos_url: 'https://api.github.com/users/johnDoe/repos',
  events_url: 'https://api.github.com/users/johnDoe/events{/privacy}',
  received_events_url: 'https://api.github.com/users/johnDoe/received_events',
  type: 'User',
  site_admin: false,
  name: 'John Doe',
  company: 'OpenAI',
  blog: 'https://johndoe.dev',
  location: 'San Francisco',
  email: 'john.doe@example.com',
  hireable: true,
  bio: 'Software Developer',
  twitter_username: 'johnDoe',
  public_repos: 42,
  public_gists: 10,
  followers: 100,
  following: 50,
  created_at: '2020-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

export const MOCK_USER_ARRAY = [MOCK_USER];

export const MOCK_SEARCH_USERS_RESPONSE = {
  total_count: 2,
  incomplete_results: false,
  items: MOCK_USER_ARRAY,
};

export const SEARCH_RESULTS = {
  items: MOCK_USER_ARRAY,
}