export const getGoogleDriveImageUrl = (url: string): string => {
  if (!url) return '';

  try {
    // Extract file ID from Google Drive URL
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match || !match[1]) return '';
    
    const fileId = match[1];
    // Use the direct image URL format
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  } catch {
    return '';
  }
};