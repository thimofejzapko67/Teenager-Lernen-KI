'use server';

import { createClient } from '@/lib/supabase/server';

export interface SearchResult {
  type: 'lesson' | 'user' | 'project';
  id: string;
  title: string;
  description?: string;
  url: string;
  relevance: number;
}

/**
 * Global search across lessons, users, and projects
 */
export async function search(query: string, options?: {
  types?: ('lesson' | 'user' | 'project')[];
  limit?: number;
}): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.trim();
  const types = options?.types || ['lesson', 'user', 'project'];
  const limit = options?.limit || 10;
  const results: SearchResult[] = [];

  try {
    const supabase = await createClient();

    // Search lessons
    if (types.includes('lesson')) {
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, title, description, slug, category')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .limit(limit);

      if (lessons) {
        results.push(...lessons.map((lesson) => ({
          type: 'lesson' as const,
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          url: `/learn/${lesson.category}/${lesson.slug}`,
          relevance: calculateRelevance(searchTerm, lesson.title, lesson.description),
        })));
      }
    }

    // Search users (profiles)
    if (types.includes('user')) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username, bio')
        .ilike('username', `%${searchTerm}%`)
        .limit(limit);

      if (profiles) {
        results.push(...profiles.map((profile) => ({
          type: 'user' as const,
          id: profile.id,
          title: profile.username,
          description: profile.bio,
          url: `/profile/${profile.username}`,
          relevance: calculateRelevance(searchTerm, profile.username, profile.bio),
        })));
      }
    }

    // Search projects
    if (types.includes('project')) {
      const { data: projects } = await supabase
        .from('projects')
        .select('id, title, description, slug')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .limit(limit);

      if (projects) {
        results.push(...projects.map((project) => ({
          type: 'project' as const,
          id: project.id,
          title: project.title,
          description: project.description,
          url: `/projects/${project.slug}`,
          relevance: calculateRelevance(searchTerm, project.title, project.description),
        })));
      }
    }

    // Sort by relevance and limit results
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit * 3);
  } catch (error) {
    console.error('Error in search:', error);
    return [];
  }
}

/**
 * Calculate relevance score for search result
 */
function calculateRelevance(
  query: string,
  title?: string,
  description?: string
): number {
  let score = 0;
  const queryLower = query.toLowerCase();

  // Title matches are more important
  if (title) {
    const titleLower = title.toLowerCase();
    if (titleLower === queryLower) score += 100;
    else if (titleLower.startsWith(queryLower)) score += 80;
    else if (titleLower.includes(queryLower)) score += 60;
  }

  // Description matches
  if (description) {
    const descLower = description.toLowerCase();
    if (descLower.includes(queryLower)) score += 20;
  }

  // Prefer shorter titles (more precise matches)
  if (title) {
    score += Math.max(0, 20 - title.length / 5);
  }

  return score;
}

/**
 * Get search suggestions
 */
export async function getSearchSuggestions(query: string): Promise<string[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const results = await search(query, { limit: 5 });
  const suggestions = new Set<string>();

  for (const result of results) {
    suggestions.add(result.title);
    if (suggestions.size >= 5) break;
  }

  return Array.from(suggestions);
}

/**
 * Get trending searches
 */
export async function getTrendingSearches(): Promise<string[]> {
  // In a real implementation, this would query a search analytics table
  // For now, return static suggestions
  return [
    'ChatGPT prompting',
    'Python basics',
    'Web development',
    'AI agents',
    'Machine learning',
    'JavaScript',
    'React',
    'API integration',
  ];
}
