// 'use client';

// import Image from 'next/image';
// import { formatDistance } from 'date-fns';
// import Link from 'next/link';
// import type { Video } from '@/utils/videos/videos';

// export function VideoCard({ video }: { video: Video }) {
//   const thumbnailUrl = `https://storage.googleapis.com/raot-tube-videos-processed/thumbnails/${video.id}.jpg`;
  
//   return (
//     <Link href={`/watch/${video.id}`} className="group">
//       <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
//         <Image
//           src={thumbnailUrl}
//           alt={video.title}
//           fill
//           className="object-cover transition-transform group-hover:scale-105"
//           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//           priority={false}
//         />
//       </div>
//       <div className="mt-2">
//         <h3 className="font-medium line-clamp-2">{video.title}</h3>
//         <p className="text-sm text-muted-foreground">
//           {formatDistance(new Date(video.created_at), new Date(), { addSuffix: true })}
//         </p>
//       </div>
//     </Link>
//   );
// }

"use client"

import Image from "next/image"
import { formatDistance } from "date-fns"
import Link from "next/link"
import type { Video } from "@/utils/videos/videos"
import { motion } from "framer-motion"
import { Play, Clock } from "lucide-react"

export function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl = `https://storage.googleapis.com/raot-tube-videos-processed/thumbnails/${video.id}.jpg`

  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Link href={`/watch/${video.id}`} className="group block">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-purple-900 bg-opacity-50">
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Play className="text-white w-12 h-12" />
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {/* {formatDuration(video.duration)} */} 33:03
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <h3 className="font-medium text-purple-100 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center text-sm text-purple-400">
            <Clock className="w-4 h-4 mr-1" />
            <p>{formatDistance(new Date(video.created_at), new Date(), { addSuffix: true })}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

