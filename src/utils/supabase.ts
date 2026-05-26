import { createClient } from '@supabase/supabase-js';
import { Course } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a client if variables exist, else fallback to mock
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' })
      }
    })
  : null;

// Seed data mock matching database schema
export const MOCK_COURSES: Course[] = [
  {
    id: 'c7017684-ee26-4447-b895-c845bc79737e',
    title: 'Advanced React Patterns',
    progress: 80,
    icon_name: 'Code2',
  },
  {
    id: 'f94db1eb-4755-45cf-81b3-a006ef082c97',
    title: 'UI Engineering',
    progress: 45,
    icon_name: 'Layout',
  },
  {
    id: '272bdeca-5dbf-4de1-968b-d72b2173e445',
    title: 'System Design',
    progress: 12,
    icon_name: 'Cpu',
  },
  {
    id: '68c783db-1d57-41ec-817f-1d4cb8047970',
    title: 'Computer Systems Architecture',
    progress: 95,
    icon_name: 'Binary',
  }
];

export async function getCourses(): Promise<Course[]> {
  // Simulate network latency so the user can see our pulsing skeleton loaders
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!supabase) {
    throw new Error('Supabase client not configured. Please check your environment variables.');
  }

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }

  if (!data || data.length === 0) {
    // If no data, we could return empty array or throw an error.
    // The brief says "Seed Data: Insert 3-4 mock rows", so we expect data.
    return [];
  }

  return data as Course[];
}
