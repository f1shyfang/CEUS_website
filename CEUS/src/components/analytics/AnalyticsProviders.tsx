'use client';

import { PostHogProvider } from '@posthog/react';
import posthog from 'posthog-js';

import GrafanaFaro from './GrafanaFaro';
import PostHogPageView from './PostHogPageView';

const isPostHogEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

export default function AnalyticsProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <>
      <GrafanaFaro />
      <PostHogPageView />
      {children}
    </>
  );

  if (!isPostHogEnabled) {
    return content;
  }

  return <PostHogProvider client={posthog}>{content}</PostHogProvider>;
}
