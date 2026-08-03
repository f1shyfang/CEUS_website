import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { JsonLd } from './JsonLd';

describe('JsonLd', () => {
  it('serializes CMS content without allowing a script-element breakout', () => {
    const data = {
      '@context': 'https://schema.org',
      headline: '</script><script>window.cmsXss = true</script>',
      description: 'A & B > C\u2028next\u2029last',
    };

    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.textContent).not.toContain('</script>');
    expect(script?.textContent).toContain('\\u003c/script\\u003e');
    expect(script?.textContent).not.toContain('\u2028');
    expect(script?.textContent).not.toContain('\u2029');
    expect(JSON.parse(script?.textContent ?? '')).toEqual(data);
  });
});
