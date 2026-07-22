import { PostHog } from 'posthog-node';

let posthogClient: PostHog | null = null;

function getPostHogServerHost() {
  const configuredHost = (process.env.NEXT_PUBLIC_POSTHOG_HOST || '/ingest').replace(/\/+$/, '');

  if (configuredHost === '/ingest') {
    return 'https://us.i.posthog.com';
  }

  return configuredHost;
}

export function getPostHogClient() {
  if (!posthogClient) {
    posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      host: getPostHogServerHost(),
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return posthogClient;
}
