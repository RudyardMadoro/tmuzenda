import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TK Muzenda Properties',
    short_name: 'TK Muzenda Properties',
    description: 'Property transformation, custom cabinetry, board supply, supporting hardware, accommodation and project delivery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f0e8',
    theme_color: '#181815',
  };
}
