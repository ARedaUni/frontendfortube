export interface Video {
    id: string;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
    metadata: {
      width: number;
      height: number;
      duration: number;
      format: string;
    };
    processed_videos: {
      [key: string]: string;
    };
  }
  
  export type VideoCreateInput = Omit<Video, 'id' | 'created_at' | 'updated_at'>;
  export type VideoUpdateInput = Partial<VideoCreateInput>;