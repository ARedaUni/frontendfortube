'use client';

import Image from 'next/image';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import type { Video } from '@/utils/videos/videos';

export function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl = `https://storage.googleapis.com/raot-tube-videos-processed/thumbnails/${video.id}.jpg`;
  
  return (
    <Link href={`/watch/${video.id}`} className="group">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="mt-2">
        <h3 className="font-medium line-clamp-2">{video.title}</h3>
        <p className="text-sm text-muted-foreground">
          {formatDistance(new Date(video.created_at), new Date(), { addSuffix: true })}
        </p>
      </div>
    </Link>
  );
}