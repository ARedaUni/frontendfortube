export function getBestQuality(processed_videos: Record<string, string>) {
  console.log('Available qualities:', Object.keys(processed_videos));
  
  if (!processed_videos || Object.keys(processed_videos).length === 0) {
    console.error('No processed videos available');
    return null;
  }

  if (processed_videos['720p']) {
    return processed_videos['720p'];
  }
  return processed_videos['360p'];
}

export function getGCSUrl(gcsPath: string) {
  if (!gcsPath) {
    console.error('No GCS path provided');
    return null;
  }

  try {
    const encodedUrl = encodeURI(gcsPath.replace('gs://', 'https://storage.googleapis.com/'));
    console.log('Encoded URL:', encodedUrl);
    return encodedUrl;
  } catch (error) {
    console.error('Error encoding GCS URL:', error);
    return null;
  }
} 