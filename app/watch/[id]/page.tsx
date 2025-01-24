'use client'
import { useVideo } from '@/hooks/videoHooks/useVideos';
import { VideoPlayer } from '@/components/videos/VideoPlayer';
import { formatDistance } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Usable, use } from 'react';

export default function WatchPage({ params }: Usable<unknown>  ) {
  const param = use(params)

  const { data: video, isLoading, error } =  useVideo(param.id);

  if (isLoading) return <WatchPageSkeleton />;
  if (error) return <div>Error loading video</div>;
  if (!video) return <div>Video not found</div>;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4">
      <VideoPlayer video={video} />
      
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-sm text-muted-foreground">
          {formatDistance(new Date(video.created_at), new Date(), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

function WatchPageSkeleton() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4">
      <div className="aspect-video bg-muted rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
} 