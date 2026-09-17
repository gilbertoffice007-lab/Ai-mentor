// Configuration mapping route paths to the minimum required semester (stage) to access them

export const SEMESTER_ACCESS_MAP: Record<string, number> = {
  // Semester 1 (Stage 1) - Available immediately upon registration
  '/dashboard': 1,
  '/roadmap': 1,
  '/tasks': 1,
  '/news': 1,
  '/settings': 1,

  // Semester 2 (Stage 2) - Unlocks after 90 days
  '/projects': 2,
  '/events': 2,

  // Semester 3 (Stage 3) - Unlocks after 180 days
  '/analytics': 3,
  '/developer-profile': 3,
  '/profile': 3,
  '/mentor': 3,

  // Semester 4 (Stage 4) - Unlocks after 270 days
  '/resume': 4,

  // Semester 5 (Stage 5) - Unlocks after 360 days
  '/internships': 5,
  '/placement': 5,

  // Semester 6 (Stage 6) - Unlocks after 450 days
  '/jobs': 6,
};

/**
 * Checks if a user has access to a specific route based on their current stage.
 * @param route The requested route (e.g. '/projects')
 * @param currentStage The user's calculated current stage
 * @returns An object indicating if access is granted, and the required stage if not.
 */
export function checkRouteAccess(route: string, currentStage: number): { hasAccess: boolean; requiredStage: number } {
  // Find matching route key (handle sub-routes if necessary, though mostly exact matches here)
  const routeKey = Object.keys(SEMESTER_ACCESS_MAP).find(k => route.startsWith(k));
  
  // If route is not in the map, assume it's public or doesn't have a semester restriction
  if (!routeKey) {
    return { hasAccess: true, requiredStage: 1 };
  }

  const requiredStage = SEMESTER_ACCESS_MAP[routeKey];
  return {
    hasAccess: currentStage >= requiredStage,
    requiredStage
  };
}
