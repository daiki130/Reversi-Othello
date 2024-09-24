const { widget } = figma;
const { useSyncedMap } = widget;

export const usePlayer = () => {
  const players = useSyncedMap<string>("players");
  return players;
}
