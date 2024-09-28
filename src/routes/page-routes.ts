export const PAGE_ROUTES = {
  USERS: {
    INDEX: '/',
    DETAILS: (username: string) => `/user-details/${username}`,
  },
};
