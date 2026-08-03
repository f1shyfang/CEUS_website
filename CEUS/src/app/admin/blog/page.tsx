'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiBookOpen, FiExternalLink, FiPlus, FiStar } from 'react-icons/fi';
import { format } from 'date-fns';
import {
  DataTable,
  DeleteConfirmModal,
  FormActions,
  FormCheckbox,
  FormField,
  FormInput,
  FormModal,
  FormSelect,
  FormTextarea,
  ImageUpload,
  type Column,
} from '@/components/admin';
import {
  createBlogPost,
  deleteBlogPost,
  fetchAdminBlogPosts,
  setFeaturedBlogPost,
  STORAGE_BUCKETS,
  updateBlogPost,
} from '@/lib/supabase';
import { slugify } from '@/lib/blog';
import { blogPostSchema, type BlogPostFormData } from '@/lib/schemas';
import { BLOG_CATEGORIES, type BlogPost } from '@/types';

const emptyPost: BlogPostFormData = {
  title: '',
  slug: '',
  category: 'news',
  excerpt: '',
  authorName: '',
  body: '',
  coverImageUrl: '',
  coverImageAlt: '',
  status: 'draft',
  isFeatured: false,
  publishedAt: '',
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [slugWasEdited, setSlugWasEdited] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: emptyPost,
  });

  const status = watch('status');
  const isFeatured = watch('isFeatured');
  const coverImageUrl = watch('coverImageUrl');

  const loadPosts = async () => {
    try {
      setPosts(await fetchAdminBlogPosts());
    } catch (error) {
      console.error('Error loading blog posts:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (status === 'draft') setValue('isFeatured', false);
  }, [setValue, status]);

  const openCreateModal = () => {
    setEditingPost(null);
    setSaveError(null);
    setSlugWasEdited(false);
    reset(emptyPost);
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setSaveError(null);
    setSlugWasEdited(post.slug !== slugify(post.title));
    reset({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      authorName: post.authorName,
      body: post.body,
      coverImageUrl: post.coverImageUrl || '',
      coverImageAlt: post.coverImageAlt || '',
      status: post.status,
      isFeatured: post.isFeatured,
      publishedAt: post.publishedAt || '',
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (formData: BlogPostFormData) => {
    const parsed = blogPostSchema.safeParse(formData);
    if (!parsed.success) return;

    setSaveError(null);
    const requestedFeature = parsed.data.status === 'published' && parsed.data.isFeatured;
    const existingPublishedAt = editingPost?.status === 'published' ? editingPost.publishedAt : undefined;
    const publishedAt = parsed.data.status === 'published'
      ? existingPublishedAt || parsed.data.publishedAt || new Date().toISOString()
      : undefined;
    const payload = { ...parsed.data, isFeatured: false, publishedAt };

    try {
      const savedPost = editingPost
        ? await updateBlogPost(editingPost.id, payload)
        : await createBlogPost(payload);

      if (requestedFeature) {
        await setFeaturedBlogPost(savedPost.id);
      } else if (editingPost?.isFeatured) {
        await updateBlogPost(editingPost.id, { isFeatured: false });
      }

      await loadPosts();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving blog post:', error);
      setSaveError(error instanceof Error ? error.message : 'Unable to save blog post. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!deletingPost) return;

    setIsDeleting(true);
    try {
      await deleteBlogPost(deletingPost.id);
      await loadPosts();
      setIsDeleteModalOpen(false);
      setDeletingPost(null);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      setDeleteError(error instanceof Error ? error.message : 'Unable to delete blog post. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<BlogPost>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <FiBookOpen className="w-4 h-4 text-gray-500" />
          <span className="font-medium">{value as string}</span>
          {row.isFeatured && <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-label="Featured" />}
          {row.status === 'published' && (
            <a
              href={`/blog/${row.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${row.title}`}
              className="text-indigo-400 hover:text-indigo-300"
            >
              <FiExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value) => <span className="text-sm text-gray-300">{value as string}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`rounded px-2 py-1 text-xs ${value === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-gray-600 text-gray-300'}`}>
          {value as string}
        </span>
      ),
    },
    {
      key: 'updatedAt',
      label: 'Updated',
      sortable: true,
      render: (value) => <span className="text-sm text-gray-300">{format(new Date(value as string), 'MMM d, yyyy')}</span>,
    },
    {
      key: 'isFeatured',
      label: 'Featured',
      render: (value) => <span className="text-sm text-gray-300">{value ? 'Yes' : 'No'}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog posts</h1>
          <p className="mt-1 text-gray-400">Create and publish CEUS blog posts</p>
        </div>
        <button onClick={openCreateModal} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700">
          <FiPlus className="w-4 h-4" />
          Add post
        </button>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        keyField="id"
        onEdit={openEditModal}
        onDelete={(post) => {
          setDeletingPost(post);
          setDeleteError(null);
          setIsDeleteModalOpen(true);
        }}
        isLoading={isLoading}
        emptyMessage="No blog posts yet. Add your first post!"
      />

      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPost ? 'Edit post' : 'Create post'} isSubmitting={isSubmitting}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {saveError && <p role="alert" className="rounded bg-red-500/10 p-3 text-sm text-red-300">{saveError}</p>}
          <FormField id="blog-title" label="Title" error={errors.title?.message} required>
            <FormInput
              id="blog-title"
              {...register('title', {
                onChange: (event) => {
                  if (!slugWasEdited) setValue('slug', slugify(event.target.value), { shouldValidate: true });
                },
              })}
              error={!!errors.title}
            />
          </FormField>
          <FormField id="blog-slug" label="URL slug" error={errors.slug?.message} required>
            <FormInput id="blog-slug" {...register('slug', { onChange: () => setSlugWasEdited(true) })} error={!!errors.slug} />
          </FormField>
          <FormField id="blog-category" label="Category" error={errors.category?.message} required>
            <FormSelect id="blog-category" {...register('category')} error={!!errors.category}>
              {BLOG_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
            </FormSelect>
          </FormField>
          <FormField id="blog-excerpt" label="Excerpt" error={errors.excerpt?.message} required>
            <FormTextarea id="blog-excerpt" {...register('excerpt')} rows={3} error={!!errors.excerpt} />
          </FormField>
          <FormField id="blog-author" label="Author" error={errors.authorName?.message} required>
            <FormInput id="blog-author" {...register('authorName')} error={!!errors.authorName} />
          </FormField>
          <FormField id="blog-cover-image" label="Cover image" error={errors.coverImageUrl?.message}>
            <ImageUpload id="blog-cover-image" bucket={STORAGE_BUCKETS.PUBLIC_IMAGES} folder="blog" currentUrl={coverImageUrl} onUpload={(url) => setValue('coverImageUrl', url, { shouldValidate: true })} onRemove={() => setValue('coverImageUrl', '', { shouldValidate: true })} />
          </FormField>
          <FormField id="blog-cover-image-alt" label="Cover image alternative text" error={errors.coverImageAlt?.message}>
            <FormInput id="blog-cover-image-alt" {...register('coverImageAlt')} error={!!errors.coverImageAlt} />
          </FormField>
          <FormField id="blog-body" label="Article body (Markdown)" error={errors.body?.message} required>
            <FormTextarea id="blog-body" {...register('body')} rows={12} error={!!errors.body} />
          </FormField>
          <FormField id="blog-status" label="Status" error={errors.status?.message} required>
            <FormSelect id="blog-status" {...register('status')} error={!!errors.status}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </FormSelect>
          </FormField>
          <FormCheckbox {...register('isFeatured')} label="Feature this post" disabled={status === 'draft'} checked={status === 'published' ? isFeatured : false} />
          {status === 'draft' && <p className="text-sm text-amber-300">Featured posts must be published.</p>}
          <FormActions onCancel={() => setIsModalOpen(false)} isSubmitting={isSubmitting} submitLabel={editingPost ? 'Update post' : 'Create post'} />
        </form>
      </FormModal>

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} title="Delete blog post" message={deleteError || `Are you sure you want to delete “${deletingPost?.title}”? This action cannot be undone.`} isDeleting={isDeleting} />
    </div>
  );
}
