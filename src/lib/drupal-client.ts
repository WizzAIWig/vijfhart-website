/**
 * Drupal JSON:API Client - Vijfhart
 * 
 * Fetches cached content from Drupal CMS:
 * - Courses (synced from BASZ PIM)
 * - Blog posts, Trainers, Events
 */

const DRUPAL_API_URL = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? 'https://cms.dcg.nl';

// Types
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  priceDisplay: string;
  imageUrl?: string;
  categories: string[];
}

export interface Trainer {
  id: string;
  name: string;
  slug: string;
  bio: string;
  photoUrl?: string;
  specializations: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl?: string;
  publishedAt: string;
}

export interface CourseSchedule {
  id: string;
  courseId: string;
  startDate: string;
  endDate: string;
  location: string;
  instructor?: string;
  seatsDisplay: string;
}

// API Functions
export async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${DRUPAL_API_URL}/jsonapi/node/course?include=field_category`, {
    next: { revalidate: 300 }, // 5 min cache
  });
  if (!res.ok) throw new Error('Failed to fetch courses');
  const data = await res.json();
  return mapCourses(data);
}

export async function getCourse(slug: string): Promise<Course | null> {
  const res = await fetch(
    `${DRUPAL_API_URL}/jsonapi/node/course?filter[field_slug]=${slug}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const courses = mapCourses(data);
  return courses[0] ?? null;
}

export async function getTrainers(): Promise<Trainer[]> {
  const res = await fetch(`${DRUPAL_API_URL}/jsonapi/node/trainer`, {
    next: { revalidate: 3600 }, // 1 hour cache
  });
  if (!res.ok) throw new Error('Failed to fetch trainers');
  const data = await res.json();
  return mapTrainers(data);
}

export async function getBlogPosts(limit = 10): Promise<BlogPost[]> {
  const res = await fetch(
    `${DRUPAL_API_URL}/jsonapi/node/blog?sort=-created&page[limit]=${limit}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error('Failed to fetch blog posts');
  const data = await res.json();
  return mapBlogPosts(data);
}

// Mappers
function mapCourses(data: { data: Array<{ id: string; attributes: Record<string, unknown> }> }): Course[] {
  return data.data.map((item) => ({
    id: item.id,
    title: String(item.attributes.title ?? ''),
    slug: String(item.attributes.field_slug ?? ''),
    description: String((item.attributes.field_description as { value?: string })?.value ?? ''),
    shortDescription: String(item.attributes.field_short_description ?? ''),
    duration: Number(item.attributes.field_duration ?? 0),
    level: String(item.attributes.field_level ?? 'intermediate') as Course['level'],
    priceDisplay: String(item.attributes.field_price_display ?? ''),
    imageUrl: item.attributes.field_image_url as string | undefined,
    categories: (item.attributes.field_categories as string[]) ?? [],
  }));
}

function mapTrainers(data: { data: Array<{ id: string; attributes: Record<string, unknown> }> }): Trainer[] {
  return data.data.map((item) => ({
    id: item.id,
    name: String(item.attributes.title ?? ''),
    slug: String(item.attributes.field_slug ?? ''),
    bio: String((item.attributes.field_bio as { value?: string })?.value ?? ''),
    photoUrl: item.attributes.field_photo_url as string | undefined,
    specializations: (item.attributes.field_specializations as string[]) ?? [],
  }));
}

function mapBlogPosts(data: { data: Array<{ id: string; attributes: Record<string, unknown> }> }): BlogPost[] {
  return data.data.map((item) => ({
    id: item.id,
    title: String(item.attributes.title ?? ''),
    slug: String(item.attributes.field_slug ?? ''),
    excerpt: String(item.attributes.field_excerpt ?? ''),
    imageUrl: item.attributes.field_image_url as string | undefined,
    publishedAt: String(item.attributes.created ?? ''),
  }));
}

// Mock data for development
export function getMockCourses(): Course[] {
  return [
    {
      id: '1',
      title: 'Python voor Beginners',
      slug: 'python-voor-beginners',
      description: 'Leer de basis van Python programmeren.',
      shortDescription: 'Start je Python reis',
      duration: 3,
      level: 'beginner',
      priceDisplay: '€ 1.495,-',
      categories: ['development', 'python'],
    },
    {
      id: '2',
      title: 'AWS Solutions Architect',
      slug: 'aws-solutions-architect',
      description: 'Bereid je voor op de AWS Solutions Architect certificering.',
      shortDescription: 'AWS certificering',
      duration: 5,
      level: 'intermediate',
      priceDisplay: '€ 2.495,-',
      categories: ['cloud', 'aws'],
    },
    {
      id: '3',
      title: 'Kubernetes Fundamentals',
      slug: 'kubernetes-fundamentals',
      description: 'Leer werken met Kubernetes containerorchestration.',
      shortDescription: 'Container orchestration',
      duration: 4,
      level: 'intermediate',
      priceDisplay: '€ 1.995,-',
      categories: ['devops', 'kubernetes'],
    },
  ];
}
