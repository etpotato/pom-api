export const Role = {
  user: 'User',
  admin: 'Admin',
} as const;
export type RoleValue = (typeof Role)[keyof typeof Role];
