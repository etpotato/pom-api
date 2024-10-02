export const Role = {
  User: 'User',
  Admin: 'Admin',
} as const;
export type RoleValue = (typeof Role)[keyof typeof Role];
