export const getFileKey = (url: string): string | null => {
  const match = url.match(/\/f\/([^/]+)$/);
  return match ? match[1] : null;
};
