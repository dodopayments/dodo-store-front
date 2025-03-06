export type EnvironmentMode = 'test' | 'live';

export function parseHostname(hostname: string): {
  mode: EnvironmentMode;
} {
  const parts = hostname.split('.');
  
  if (parts[0] === 'test') {
    return { mode: 'test' };
  } else if (parts[0] === 'store') {
    return { mode: 'live' };
  }
  
  return { mode: 'test' };
} 