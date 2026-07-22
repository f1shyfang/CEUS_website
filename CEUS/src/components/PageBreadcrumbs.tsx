import { Breadcrumbs, getBreadcrumbs } from './Breadcrumbs';
import { JsonLd } from './JsonLd';
import { buildBreadcrumbSchema } from '../lib/seo';

interface PageBreadcrumbsProps {
  pathname: string;
  className?: string;
}

export function PageBreadcrumbs({ pathname, className = 'mb-6' }: PageBreadcrumbsProps) {
  const items = getBreadcrumbs(pathname);

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <Breadcrumbs items={items} className={className} />
    </>
  );
}
