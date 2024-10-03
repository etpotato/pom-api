import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { SENTRY_DSN } from './sentry.config';

Sentry.init({
  // TODO: add release version
  // release: "pom-api-nestjs@" + process.env.COMMIT_SHA,
  dsn: SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
