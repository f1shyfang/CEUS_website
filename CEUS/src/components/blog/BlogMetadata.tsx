import { calculateReadingTime } from '@/lib/blog';
import type { BlogPost } from '@/types';

const categoryLabels = {
  news: 'News',
  'student-guides': 'Student Guides',
  'careers-industry': 'Careers & Industry',
} as const;

export default function BlogMetadata({ post }: { post: BlogPost }) {
  const publishedDate = post.publishedAt ?? post.createdAt;
  const date = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(publishedDate));

  return (
    <p className="text-sm text-slate-600">
      <span className="font-medium text-blue-700">{categoryLabels[post.category]}</span>
      <span aria-hidden="true"> · </span>
      <span>{post.authorName}</span>
      <span aria-hidden="true"> · </span>
      <time dateTime={publishedDate}>{date}</time>
      <span aria-hidden="true"> · </span>
      <span>{calculateReadingTime(post.body)} min read</span>
    </p>
  );
}
