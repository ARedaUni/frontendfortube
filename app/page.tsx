'use client';

import { Suspense } from 'react';
import { useVideos } from '@/hooks/videoHooks/useVideos';
import { VideoCard } from '@/components/videos/VideoCard';

export const dynamic = 'force-dynamic';

function VideoGrid() {
  const { data: videos, isLoading, error } = useVideos();
  
  if (isLoading) return <VideoGridSkeleton />;
  if (error) return <div>Error loading videos</div>;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos?.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <h1 className="text-2xl font-bold">Latest Videos</h1>
      <Suspense fallback={<VideoGridSkeleton />}>
        <VideoGrid />
      </Suspense>
    </main>
  );
}

function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="aspect-video bg-muted rounded-lg animate-pulse" />
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

