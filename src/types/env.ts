export const NodeEnv = {
  Dev: 'development',
  Prod: 'production',
} as const;
export type NodeEnvValue = (typeof NodeEnv)[keyof typeof NodeEnv];
