import type { HideoutModule, Project } from '../types';

/**
 * Builds a map of item IDs to their reference count across hideout modules and projects
 */
export function buildReferenceCount(
  hideoutModules: HideoutModule[],
  projects: Project[]
): Map<string, number> {
  const referenceCounts = new Map<string, number>();

  // Count references in hideout modules
  for (const module of hideoutModules) {
    for (const level of module.levels) {
      for (const requirement of level.requirementItemIds) {
        const currentCount = referenceCounts.get(requirement.itemId) || 0;
        referenceCounts.set(requirement.itemId, currentCount + 1);
      }
    }
  }

  // Count references in projects
  for (const project of projects) {
    for (const phase of project.phases) {
      for (const requirement of phase.requirementItemIds) {
        const currentCount = referenceCounts.get(requirement.itemId) || 0;
        referenceCounts.set(requirement.itemId, currentCount + 1);
      }
    }
  }

  return referenceCounts;
}

/**
 * Filters items by name (case-insensitive)
 */
export function filterItemsByName(items: any[], searchQuery: string) {
  if (!searchQuery.trim()) {
    return items;
  }

  const lowerQuery = searchQuery.toLowerCase();
  return items.filter(item =>
    item.name.toLowerCase().includes(lowerQuery)
  );
}
