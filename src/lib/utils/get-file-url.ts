export const getFileUrl = (key: string) =>
  `https://${process.env.UPLOADTHING_APP_ID}.ufs.sh/f/${key}`;
