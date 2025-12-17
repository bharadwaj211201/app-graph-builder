export const fetchApps = async () => {
  const res = await fetch('/api/apps');
  if (!res.ok) throw new Error('Failed to fetch apps');
  return res.json();
};

export const fetchGraph = async (appId: string) => {
  const res = await fetch(`/api/apps/${appId}/graph`);
  if (!res.ok) throw new Error('Failed to fetch graph');
  return res.json();
};