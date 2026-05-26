import { getCourses } from '@/utils/supabase';
import DashboardClient from '@/components/DashboardClient';

// Force dynamic rendering to always fetch fresh data from Supabase
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  // Trigger Server Component data fetch (RSC promise)
  const coursesPromise = getCourses();

  return (
    <DashboardClient coursesPromise={coursesPromise} />
  );
}
