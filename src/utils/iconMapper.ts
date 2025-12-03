// Icon mapping utility to map API icon URLs to local imports
import {
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  Flask,
  Flutter,
  Mysql,
  PHP,
  Python,
  Unity,
  Dart,
} from '../assets';

// Map technology names to their icon imports
const iconMap: Record<string, string> = {
  'HTML 5': 'html',
  'CSS 3': 'css',
  'TypeScript': 'typescript',
  'React JS': 'reactjs',
  'Tailwind CSS': 'tailwind',
  'Node JS': 'nodejs',
  'MongoDB': 'mongodb',
  'git': 'git',
  'figma': 'figma',
  'flask': 'Flask',
  'flutter': 'Flutter',
  'mysql': 'Mysql',
  'python': 'Python',
  'PHP': 'PHP',
  'Dart': 'Dart',
  'Unity': 'Unity',
};

// Map icon name to actual import
const iconImports: Record<string, string> = {
  html,
  css,
  typescript,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  Flask,
  Flutter,
  Mysql,
  Python,
  PHP,
  Dart,
  Unity,
};

/**
 * Get icon for technology from API or static data
 * If API provides icon URL, use it; otherwise map to local import
 */
export const getTechnologyIcon = (techName: string, iconUrl?: string): string => {
  // If API provides icon URL, use it
  if (iconUrl) {
    return iconUrl;
  }

  // Otherwise, map to local import
  const iconKey = iconMap[techName];
  if (iconKey && iconImports[iconKey]) {
    return iconImports[iconKey];
  }

  // Fallback: return empty string or default icon
  return '';
};

