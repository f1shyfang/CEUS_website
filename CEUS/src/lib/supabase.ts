// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import { Event, Sponsor, TeamCategory, Member, Job, JobType, JobCompany, WorkingRight, BlogPost, BlogPostInput } from '../types';
import { normalizeTeamCategory, sortTeamCategories } from './schemas';
import { BlogPostRow, toBlogPost } from './blog';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Single shared client. In the browser the session is stored in cookies
// (via @supabase/ssr) so the proxy middleware sees the same, auto-refreshed
// session as the client. On the server this module is only used for
// anonymous public reads, so sessions are disabled there.
export const supabase =
  typeof window === 'undefined'
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : createBrowserClient(supabaseUrl, supabaseAnonKey);

// ============================================
// Authentication Helpers
// ============================================

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }

  return true;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    throw error;
  }

  return data.session;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting user:', error);
    return null;
  }

  return data.user;
}

// Subscribe to auth state changes
export function onAuthStateChange(callback: (event: string, session: unknown) => void) {
  return supabase.auth.onAuthStateChange(callback);
}

type EventRow = {
  id: string;
  title: string;
  date: string;
  image_url: string | null;
  facebook_event_link: string | null;
  description: string | null;
  category: Event['category'];
};

type SponsorRow = {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  tier: Sponsor['tier'];
  featured: boolean | null;
};

type TeamMemberRow = {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  category: string;
  sort_order: number;
};

export async function fetchEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, date, image_url, facebook_event_link, description, category')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  return (data as EventRow[] | null ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    date: row.date,
    imageUrl: getImageUrl(
      row.image_url,
      getStorageUrl(STORAGE_BUCKETS.EVENTS, 'events/default-event-placeholder.png'),
      STORAGE_BUCKETS.EVENTS
    ),
    facebookEventLink: row.facebook_event_link || '#',
    description: row.description || '',
    category: row.category,
  }));
}

export async function fetchSponsors(): Promise<Sponsor[]> {
  const { data, error } = await supabase
    .from('sponsors')
    .select('id, name, logo_url, website_url, description, tier, featured');

  if (error) {
    console.error('Error fetching sponsors:', error);
    throw error;
  }

  return (data as SponsorRow[] | null ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    logoUrl: getImageUrl(row.logo_url, '', STORAGE_BUCKETS.SPONSORS),
    websiteUrl: row.website_url || '#',
    description: row.description || '',
    tier: row.tier,
    featured: Boolean(row.featured),
  }));
}

export async function fetchTeamCategories(): Promise<TeamCategory[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('id, name, role, image_url, email, linkedin_url, category, sort_order')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }

  const grouped: Record<string, Member[]> = {};
  (data as TeamMemberRow[] | null ?? []).forEach((row) => {
    const member: Member = {
      id: row.id,
      name: row.name,
      role: row.role,
      imageUrl: getImageUrl(
        row.image_url,
        getStorageUrl(STORAGE_BUCKETS.TEAM, 'team/no_profile_img.jpg'),
        STORAGE_BUCKETS.TEAM
      ),
      email: row.email || undefined,
      linkedInUrl: row.linkedin_url || undefined,
    };
    const category = normalizeTeamCategory(row.category);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    if (!grouped[category].some((existing) => existing.id === member.id)) {
      grouped[category].push(member);
    }
  });

  return Object.entries(grouped).map(([name, members]) => ({
    name,
    members,
  }));
}

// Type definition for contact form submissions
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  status?: 'new' | 'read' | 'replied';
}

// Function to submit contact form data
export async function submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) {
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([
      {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: 'new',
      },
    ])
    .select();

  if (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }

  return result;
}

// Function to get all contact submissions (for admin dashboard in future)
export async function getContactSubmissions() {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact submissions:', error);
    throw error;
  }

  return data;
}

// Function to update submission status (for admin use)
export async function updateSubmissionStatus(id: string, status: 'new' | 'read' | 'replied') {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating submission status:', error);
    throw error;
  }

  return data;
}

// Function to delete a contact submission
export async function deleteContactSubmission(id: string) {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting contact submission:', error);
    throw error;
  }

  return true;
}

// ============================================
// Events CRUD Operations
// ============================================

export interface EventInput {
  title: string;
  date: string;
  description: string;
  category: Event['category'];
  imageUrl?: string;
  facebookEventLink?: string;
}

export async function createEvent(event: EventInput) {
  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        title: event.title,
        date: event.date,
        image_url: event.imageUrl || null,
        facebook_event_link: event.facebookEventLink || null,
        description: event.description,
        category: event.category,
      },
    ])
    .select();

  if (error) {
    console.error('Error creating event:', error);
    throw error;
  }

  return data[0];
}

export async function updateEvent(id: string, event: Partial<EventInput>) {
  const updateData: Record<string, unknown> = {};
  if (event.title !== undefined) updateData.title = event.title;
  if (event.date !== undefined) updateData.date = event.date;
  if (event.imageUrl !== undefined) updateData.image_url = event.imageUrl;
  if (event.facebookEventLink !== undefined) updateData.facebook_event_link = event.facebookEventLink;
  if (event.description !== undefined) updateData.description = event.description;
  if (event.category !== undefined) updateData.category = event.category;

  const { data, error } = await supabase
    .from('events')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating event:', error);
    throw error;
  }

  return data[0];
}

export async function deleteEvent(id: string) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    throw error;
  }

  return true;
}

// ============================================
// Sponsors CRUD Operations
// ============================================

export interface SponsorInput {
  name: string;
  description: string;
  tier: Sponsor['tier'];
  logoUrl?: string;
  websiteUrl?: string;
  featured?: boolean;
}

export async function createSponsor(sponsor: SponsorInput) {
  const { data, error } = await supabase
    .from('sponsors')
    .insert([
      {
        name: sponsor.name,
        logo_url: sponsor.logoUrl || null,
        website_url: sponsor.websiteUrl || null,
        description: sponsor.description,
        tier: sponsor.tier,
        featured: sponsor.featured || false,
      },
    ])
    .select();

  if (error) {
    console.error('Error creating sponsor:', error);
    throw error;
  }

  return data[0];
}

export async function updateSponsor(id: string, sponsor: Partial<SponsorInput>) {
  const updateData: Record<string, unknown> = {};
  if (sponsor.name !== undefined) updateData.name = sponsor.name;
  if (sponsor.logoUrl !== undefined) updateData.logo_url = sponsor.logoUrl;
  if (sponsor.websiteUrl !== undefined) updateData.website_url = sponsor.websiteUrl;
  if (sponsor.description !== undefined) updateData.description = sponsor.description;
  if (sponsor.tier !== undefined) updateData.tier = sponsor.tier;
  if (sponsor.featured !== undefined) updateData.featured = sponsor.featured;

  const { data, error } = await supabase
    .from('sponsors')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating sponsor:', error);
    throw error;
  }

  return data[0];
}

export async function deleteSponsor(id: string) {
  const { error } = await supabase
    .from('sponsors')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting sponsor:', error);
    throw error;
  }

  return true;
}

// ============================================
// Jobs CRUD Operations
// ============================================

type JobRow = {
  id: string;
  title: string;
  company: { name?: string; website?: string; logo?: string } | null;
  description: string;
  one_liner: string | null;
  application_url: string;
  source_urls: string[] | null;
  type: JobType;
  locations: string[] | null;
  industry_field: string;
  working_rights: WorkingRight[] | null;
  close_date: string | null;
  is_sponsored: boolean | null;
  outdated: boolean | null;
  created_at: string;
  updated_at: string;
};

export interface JobInput {
  title: string;
  company: JobCompany;
  description: string;
  applicationUrl: string;
  type: JobType;
  locations: string[];
  industryField: string;
  workingRights: WorkingRight[];
  sourceUrls?: string[];
  oneLiner?: string;
  closeDate?: string;
  isSponsored?: boolean;
  outdated?: boolean;
}

function normalizeCompany(raw: JobRow['company']): JobCompany {
  const name = raw?.name ?? '';
  const websiteRaw = raw?.website || undefined;
  const logoRaw = raw?.logo || undefined;
  return {
    name,
    website: websiteRaw,
    logo: logoRaw ? getImageUrl(logoRaw, '', STORAGE_BUCKETS.PUBLIC_IMAGES) : undefined,
  };
}

export async function fetchJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select(
      'id, title, company, description, one_liner, application_url, source_urls, type, locations, industry_field, working_rights, close_date, is_sponsored, outdated, created_at, updated_at'
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }

  return (data as JobRow[] | null ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    company: normalizeCompany(row.company),
    description: row.description,
    oneLiner: row.one_liner || undefined,
    applicationUrl: row.application_url,
    sourceUrls: row.source_urls ?? [],
    type: row.type,
    locations: row.locations ?? [],
    industryField: row.industry_field,
    workingRights: row.working_rights ?? [],
    closeDate: row.close_date || undefined,
    isSponsored: Boolean(row.is_sponsored),
    outdated: Boolean(row.outdated),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

function buildCompanyPayload(company: JobCompany) {
  return {
    name: company.name,
    website: company.website || undefined,
    logo: company.logo || undefined,
  };
}

export async function createJob(job: JobInput) {
  const { data, error } = await supabase
    .from('jobs')
    .insert([
      {
        title: job.title,
        company: buildCompanyPayload(job.company),
        description: job.description,
        one_liner: job.oneLiner || null,
        application_url: job.applicationUrl,
        source_urls: job.sourceUrls ?? [],
        type: job.type,
        locations: job.locations,
        industry_field: job.industryField,
        working_rights: job.workingRights,
        close_date: job.closeDate || null,
        is_sponsored: job.isSponsored ?? false,
        outdated: job.outdated ?? false,
      },
    ])
    .select();

  if (error) {
    console.error('Error creating job:', error);
    throw error;
  }

  return data[0];
}

export async function updateJob(id: string, job: Partial<JobInput>) {
  const updateData: Record<string, unknown> = {};
  if (job.title !== undefined) updateData.title = job.title;
  if (job.company !== undefined) updateData.company = buildCompanyPayload(job.company);
  if (job.description !== undefined) updateData.description = job.description;
  if (job.oneLiner !== undefined) updateData.one_liner = job.oneLiner || null;
  if (job.applicationUrl !== undefined) updateData.application_url = job.applicationUrl;
  if (job.sourceUrls !== undefined) updateData.source_urls = job.sourceUrls;
  if (job.type !== undefined) updateData.type = job.type;
  if (job.locations !== undefined) updateData.locations = job.locations;
  if (job.industryField !== undefined) updateData.industry_field = job.industryField;
  if (job.workingRights !== undefined) updateData.working_rights = job.workingRights;
  if (job.closeDate !== undefined) updateData.close_date = job.closeDate || null;
  if (job.isSponsored !== undefined) updateData.is_sponsored = job.isSponsored;
  if (job.outdated !== undefined) updateData.outdated = job.outdated;

  const { data, error } = await supabase
    .from('jobs')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating job:', error);
    throw error;
  }

  return data[0];
}

export async function deleteJob(id: string) {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting job:', error);
    throw error;
  }

  return true;
}

// ============================================
// Blog post persistence
// ============================================

const BLOG_POST_COLUMNS =
  'id, title, slug, category, excerpt, author_name, body, cover_image_url, cover_image_alt, status, is_featured, published_at, created_at, updated_at';

function buildBlogPostPayload(post: BlogPostInput) {
  return {
    title: post.title,
    slug: post.slug,
    category: post.category,
    excerpt: post.excerpt,
    author_name: post.authorName,
    body: post.body,
    cover_image_url: post.coverImageUrl || null,
    cover_image_alt: post.coverImageAlt || null,
    status: post.status,
    published_at: post.publishedAt || null,
  };
}

async function setRequestedFeaturedBlogPost(id: string, post: BlogPostInput) {
  if (!post.isFeatured || post.status !== 'published') {
    return undefined;
  }

  const { data, error } = await supabase.rpc('set_featured_blog_post', {
    target_post_id: id,
  });

  if (error) {
    console.error('Error setting featured blog post:', error);
    throw error;
  }

  return toBlogPost(data as BlogPostRow);
}

export async function fetchPublishedBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_POST_COLUMNS)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching published blog posts:', error);
    throw error;
  }

  return ((data as BlogPostRow[] | null) ?? []).map(toBlogPost);
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_POST_COLUMNS)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }

  return data ? toBlogPost(data as BlogPostRow) : undefined;
}

export async function fetchAdminBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_POST_COLUMNS)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin blog posts:', error);
    throw error;
  }

  return ((data as BlogPostRow[] | null) ?? []).map(toBlogPost);
}

export async function createBlogPost(post: BlogPostInput): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(buildBlogPostPayload(post))
    .select(BLOG_POST_COLUMNS)
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }

  return (await setRequestedFeaturedBlogPost(data.id, post)) ?? toBlogPost(data as BlogPostRow);
}

export async function updateBlogPost(id: string, post: BlogPostInput): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(buildBlogPostPayload(post))
    .eq('id', id)
    .select(BLOG_POST_COLUMNS)
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }

  return (await setRequestedFeaturedBlogPost(id, post)) ?? toBlogPost(data as BlogPostRow);
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }

  return true;
}

export async function setFeaturedBlogPost(id: string): Promise<BlogPost> {
  const { data, error } = await supabase.rpc('set_featured_blog_post', {
    target_post_id: id,
  });

  if (error) {
    console.error('Error setting featured blog post:', error);
    throw error;
  }

  return toBlogPost(data as BlogPostRow);
}

// ============================================
// Team Members CRUD Operations
// ============================================

export interface TeamMemberInput {
  name: string;
  role: string;
  imageUrl?: string;
  email?: string;
  linkedInUrl?: string;
  categories: string[];
  sortOrder: number;
}

export type GroupedTeamMember = Member & {
  categories: string[];
  sortOrder: number;
};

function buildTeamMemberRowPayload(id: string, member: TeamMemberInput, category: string) {
  return {
    id,
    name: member.name,
    role: member.role,
    image_url: member.imageUrl || null,
    email: member.email || null,
    linkedin_url: member.linkedInUrl || null,
    category,
    sort_order: member.sortOrder,
  };
}

function groupTeamMemberRows(
  rows: TeamMemberRow[]
): GroupedTeamMember[] {
  const grouped = new Map<string, GroupedTeamMember>();

  for (const row of rows) {
    const category = normalizeTeamCategory(row.category);
    const existing = grouped.get(row.id);

    if (existing) {
      if (!existing.categories.includes(category)) {
        existing.categories.push(category);
      }
      continue;
    }

    grouped.set(row.id, {
      id: row.id,
      name: row.name,
      role: row.role,
      imageUrl: row.image_url || undefined,
      email: row.email || undefined,
      linkedInUrl: row.linkedin_url || undefined,
      categories: [category],
      sortOrder: row.sort_order,
    });
  }

  return Array.from(grouped.values()).map((member) => ({
    ...member,
    categories: sortTeamCategories(member.categories),
  }));
}

function buildTeamMemberId(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return `member${Date.now()}`;
  }

  const first = parts[0].replace(/[^a-zA-Z0-9]/g, '');
  const initials = parts
    .slice(1)
    .map((part) => part.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join('');

  const raw = `${first}${initials}`;
  const normalized = raw.charAt(0).toLowerCase() + raw.slice(1);
  return normalized || `member${Date.now()}`;
}

async function resolveTeamMemberId(baseId: string): Promise<string> {
  let candidate = baseId;
  let suffix = 2;

  while (true) {
    const { data, error } = await supabase
      .from('team_members')
      .select('id')
      .eq('id', candidate)
      .limit(1);

    if (error) {
      throw error;
    }

    if (!data?.length) {
      return candidate;
    }

    candidate = `${baseId}${suffix}`;
    suffix += 1;
  }
}

export async function fetchAllTeamMembers(): Promise<GroupedTeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('id, name, role, image_url, email, linkedin_url, category, sort_order')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }

  return groupTeamMemberRows((data as TeamMemberRow[] | null) ?? []);
}

export async function createTeamMember(member: TeamMemberInput) {
  const id = await resolveTeamMemberId(buildTeamMemberId(member.name));
  const rows = member.categories.map((category) =>
    buildTeamMemberRowPayload(id, member, category)
  );

  const { data, error } = await supabase.from('team_members').insert(rows).select();

  if (error) {
    console.error('Error creating team member:', error);
    throw error;
  }

  return data;
}

export async function updateTeamMember(id: string, member: TeamMemberInput) {
  const { error: legacyRenameError } = await supabase
    .from('team_members')
    .update({ category: 'Industry' })
    .eq('id', id)
    .eq('category', 'Careers');

  if (legacyRenameError) {
    console.error('Error renaming legacy team category:', legacyRenameError);
    throw legacyRenameError;
  }

  const { data: existingRows, error: fetchError } = await supabase
    .from('team_members')
    .select('id, category')
    .eq('id', id);

  if (fetchError) {
    console.error('Error fetching team member categories:', fetchError);
    throw fetchError;
  }

  const sharedUpdate: Record<string, unknown> = {
    name: member.name,
    role: member.role,
    image_url: member.imageUrl || null,
    email: member.email || null,
    linkedin_url: member.linkedInUrl || null,
    sort_order: member.sortOrder,
  };

  const { error: updateError } = await supabase
    .from('team_members')
    .update(sharedUpdate)
    .eq('id', id);

  if (updateError) {
    console.error('Error updating team member:', updateError);
    throw updateError;
  }

  const currentCategories = new Set(
    (existingRows ?? []).map((row) => normalizeTeamCategory(row.category))
  );
  const targetCategories = new Set(member.categories);

  const categoriesToRemove = Array.from(currentCategories).filter(
    (category) => !targetCategories.has(category)
  );
  const categoriesToAdd = member.categories.filter(
    (category) => !currentCategories.has(category)
  );

  for (const category of categoriesToRemove) {
    const legacyCategory = category === 'Industry' ? 'Careers' : category;
    const { error: deleteError } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)
      .in('category', [category, legacyCategory]);

    if (deleteError) {
      console.error('Error removing team member category:', deleteError);
      throw deleteError;
    }
  }

  if (categoriesToAdd.length > 0) {
    const rows = categoriesToAdd.map((category) =>
      buildTeamMemberRowPayload(id, member, category)
    );
    const { error: insertError } = await supabase.from('team_members').insert(rows);

    if (insertError) {
      console.error('Error adding team member categories:', insertError);
      throw insertError;
    }
  }

  const { data, error } = await supabase
    .from('team_members')
    .select('id, name, role, image_url, email, linkedin_url, category, sort_order')
    .eq('id', id);

  if (error) {
    console.error('Error fetching updated team member:', error);
    throw error;
  }

  return groupTeamMemberRows((data as TeamMemberRow[] | null) ?? [])[0];
}

export async function deleteTeamMember(id: string) {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }

  return true;
}

// ============================================
// Supabase Storage Helpers
// ============================================

// Storage bucket names
export const STORAGE_BUCKETS = {
  PUBLIC_IMAGES: 'public-images',
  EVENTS: 'events',
  SPONSORS: 'sponsors',
  TEAM: 'team',
  ASSETS: 'assets',
} as const;

export const STORAGE_FOLDERS = {
  EVENTS: 'events',
  SPONSORS: 'sponsors',
  TEAM: 'team',
  ASSETS: 'assets',
} as const;

type BucketName = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

/**
 * Get the public URL for a file in Supabase Storage
 */
export function getStorageUrl(bucket: BucketName, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Convert a relative image path (e.g., "events/filename.png") to a full Supabase URL
 * Falls back to default placeholder if path is not available
 */
export function getImageUrl(
  imagePath: string | null | undefined,
  defaultFallback: string,
  preferredBucket?: BucketName
): string {
  if (!imagePath) {
    return defaultFallback;
  }

  // Keep absolute URLs untouched (external CDN, etc.)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  let normalizedPath = imagePath.trim();
  normalizedPath = normalizedPath.replace(/^\/+/, '');

  // Support legacy formats like /images/events/foo.png and images/events/foo.png
  if (normalizedPath.startsWith('images/')) {
    normalizedPath = normalizedPath.slice('images/'.length);
  }

  // Check if the normalized path looks like a relative path (e.g., "events/file.png", "team/file.jpg")
  // If so, use the preferred bucket (all actual files are in 'public-images' bucket)
  if (preferredBucket) {
    const validBuckets = Object.values(STORAGE_BUCKETS) as string[];
    if (normalizedPath.includes('/') || !validBuckets.includes(normalizedPath)) {
      try {
        return getStorageUrl(preferredBucket, normalizedPath);
      } catch (err) {
        console.warn(`Failed to generate Supabase URL for ${imagePath}:`, err);
        return defaultFallback;
      }
    }
  }

  // For absolute bucket references or files without folders
  const parts = normalizedPath.split('/');
  const firstPart = parts[0] as BucketName;
  const validBuckets = Object.values(STORAGE_BUCKETS) as string[];
  const isValidBucket = validBuckets.includes(firstPart);

  if (!isValidBucket) {
    if (preferredBucket) {
      try {
        return getStorageUrl(preferredBucket, normalizedPath);
      } catch (err) {
        console.warn(`Failed to generate Supabase URL for ${imagePath}:`, err);
      }
    }
    return defaultFallback;
  }

  try {
    return getStorageUrl(firstPart, normalizedPath);
  } catch (err) {
    console.warn(`Failed to generate Supabase URL for ${imagePath}:`, err);
    return defaultFallback;
  }
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  bucket: BucketName,
  path: string,
  file: File,
  options?: { upsert?: boolean }
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: options?.upsert ?? false,
    });

  if (error) {
    console.error(`Error uploading to ${bucket}:`, error);
    throw error;
  }

  return {
    path: data.path,
    url: getStorageUrl(bucket, data.path),
  };
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucket: BucketName, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    console.error(`Error deleting from ${bucket}:`, error);
    throw error;
  }

  return true;
}

/**
 * List files in a Supabase Storage bucket
 */
export async function listFiles(bucket: BucketName, folder?: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder || '', {
      limit: 100,
      sortBy: { column: 'name', order: 'asc' },
    });

  if (error) {
    console.error(`Error listing files in ${bucket}:`, error);
    throw error;
  }

  return data;
}
