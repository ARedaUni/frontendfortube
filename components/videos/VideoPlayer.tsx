'use client'
import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import type { Video } from '@/types/video';

interface VideoPlayerProps {
  video: Video;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      console.error('Video element reference not found');
      return;
    }

    try {
      // Log video data
      console.log('Video data:', {
        id: video.id,
        processed_videos: video.processed_videos,
      });

      // Get available video qualities and properly encode URLs
      const qualities = Object.entries(video.processed_videos).map(([quality, url]) => {
        const encodedUrl = encodeURI(url.replace('gs://', 'https://storage.googleapis.com/'));
        console.log(`Quality ${quality} URL:`, encodedUrl);
        return {
          label: quality,
          src: encodedUrl,
        };
      });

      if (qualities.length === 0) {
        console.error('No video qualities available');
        return;
      }

      // Initialize video.js player
      const player = videojs(videoRef.current, {
        controls: true,
        fluid: true,
        responsive: true,
        playbackRates: [0.5, 1, 1.5, 2],
        sources: qualities,
        width: 640,
        height: 360,
      }, function onPlayerReady(this: any) {
        console.log('Player is ready');
        this.on('loadedmetadata', function() {
          console.log('Video metadata loaded');
        });
      });

      playerRef.current = player;

    } catch (error) {
      console.error('Error initializing video player:', error);
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (error) {
          console.error('Error disposing player:', error);
        }
      }
    };
  }, [video]);

  return (
    <div ref={containerRef} className="aspect-video w-full">
      <div data-vjs-player>
        <video 
          ref={videoRef}
          className="video-js vjs-big-play-centered vjs-theme-city"
          controls
          preload="auto"
          poster={`https://storage.googleapis.com/raot-tube-videos-processed/thumbnails/${video.id}.jpg`}
        >
          {Object.entries(video.processed_videos).map(([quality, url]) => (
            <source 
              key={quality}
              src={encodeURI(url.replace('gs://', 'https://storage.googleapis.com/'))}
              type="video/mp4"
            />
          ))}
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that supports HTML5 video
          </p>
        </video>
      </div>
    </div>
  );
} 