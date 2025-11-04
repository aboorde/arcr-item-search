import type { Item, HideoutModule, Project } from '../types';

const BASE_URL = 'https://raw.githubusercontent.com/RaidTheory/arcraiders-data/main';

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(`${BASE_URL}/items.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchHideoutModules(): Promise<HideoutModule[]> {
  const response = await fetch(`${BASE_URL}/hideoutModules.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch hideout modules: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${BASE_URL}/projects.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }
  return response.json();
}

export async function loadAllData() {
  try {
    const [items, hideoutModules, projects] = await Promise.all([
      fetchItems(),
      fetchHideoutModules(),
      fetchProjects(),
    ]);

    return { items, hideoutModules, projects };
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}
