import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import type { Video, VideoCreateInput, VideoUpdateInput } from '@/types/video';

// Query Keys
export const videoKeys = {
  all: ['videos'] as const,
  lists: () => [...videoKeys.all, 'list'] as const,
  list: (filters: string) => [...videoKeys.lists(), { filters }] as const,
  details: () => [...videoKeys.all, 'detail'] as const,
  detail: (id: string) => [...videoKeys.details(), id] as const,
};

// Hooks
export function useVideos() {
  const client = createClient();
  
  return useQuery({
    queryKey: videoKeys.lists(),
    queryFn: () => client.videos.list(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useVideo(id: string) {
    const client = createClient();
    
    return useQuery({
      queryKey: videoKeys.detail(id),
      queryFn: () => client.videos.getById(id),
      staleTime: 1000 * 60 * 5,
    });
  }

export function useCreateVideo() {
  const client = createClient();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (video: VideoCreateInput) => client.videos.create(video),
    onSuccess: (newVideo) => {
      queryClient.setQueryData(videoKeys.lists(), (old: Video[] = []) => {
        return [newVideo, ...old];
      });
    },
  });
}

export function useUpdateVideo() {
  const client = createClient();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: VideoUpdateInput }) =>
      client.videos.update(id, updates),
    onSuccess: (updatedVideo) => {
      queryClient.setQueryData(videoKeys.detail(updatedVideo.id), updatedVideo);
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
    },
  });
}

export function useVideoSubscription() {
  const queryClient = useQueryClient();
  const client = createClient();

  React.useEffect(() => {
    const unsubscribe = client.videos.subscribe((video) => {
      queryClient.setQueryData(videoKeys.detail(video.id), video);
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient]);
}
