export const formatDuration = (durationInSeconds: string): string => {
  const totalSeconds = parseInt(durationInSeconds.replace('s', ''), 10);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}min${seconds}s`;
};