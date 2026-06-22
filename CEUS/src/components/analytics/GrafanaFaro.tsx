'use client';

import { faro, getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { useEffect } from 'react';

export default function GrafanaFaro() {
  useEffect(() => {
    const faroUrl = process.env.NEXT_PUBLIC_FARO_URL;
    if (!faroUrl || faro.api) {
      return;
    }

    try {
      initializeFaro({
        url: faroUrl,
        app: {
          name: process.env.NEXT_PUBLIC_FARO_APP_NAME || 'ceus-website',
          version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
          environment: process.env.NODE_ENV,
        },
        instrumentations: [...getWebInstrumentations(), new TracingInstrumentation()],
      });
    } catch {
      // Faro should never break the app
    }
  }, []);

  return null;
}
