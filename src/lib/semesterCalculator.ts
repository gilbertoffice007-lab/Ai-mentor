/**
 * semesterCalculator.ts
 * Centralized date-based semester calculation service.
 * All functions are pure — no hardcoded dates, no side effects.
 */

export interface SemesterInfo {
  /** 1-indexed current semester number (e.g. 3) */
  currentSemester: number;
  /** Day within the current semester (e.g. 27) */
  semesterDay: number;
  /** Total days in one semester (e.g. 182 for 6-month) */
  totalSemesterDays: number;
  /** 0–100 completion % for the current semester */
  semesterProgress: number;
  /** 0–100 completion % across the entire course */
  overallProgress: number;
  /** 0–100 completion % (alias, same as semesterProgress) */
  semesterProgressPercent: number;
  /** Whole-course completion % (0–100) */
  overallProgressPercent: number;
  /** True if the student has finished all semesters */
  isCourseComplete: boolean;
  /** Formatted label e.g. "Semester 3 · Day 27 of 182" */
  semesterLabel: string;
  /** Days remaining in current semester */
  daysRemaining: number;
  /** ISO date string when current semester started */
  currentSemesterStart: string;
  /** ISO date string when current semester ends */
  currentSemesterEnd: string;
  /** List of all semesters with their status */
  allSemesters: SemesterStatus[];
}

export interface SemesterStatus {
  number: number;
  status: 'completed' | 'current' | 'locked';
  startDate: string;
  endDate: string;
  progressPercent: number;
}

/**
 * Core calculation function.
 * @param courseStartDate  - ISO date 'YYYY-MM-DD' when the course started
 * @param totalSemesters   - Total number of semesters (default 8)
 * @param courseDurationMonths - Duration of each semester in months (default 6)
 * @param referenceDate    - Date to calculate from (defaults to today, injectable for testing)
 */
export function getCurrentSemester(
  courseStartDate: string | null | undefined,
  totalSemesters: number = 8,
  courseDurationMonths: number = 6,
  referenceDate?: Date
): SemesterInfo {
  const today = referenceDate ?? new Date();

  // If no course start date, return a safe zero-state
  if (!courseStartDate) {
    return buildZeroState(totalSemesters);
  }

  const startDate = parseLocalDate(courseStartDate);

  // If course hasn't started yet, return zero state
  if (today < startDate) {
    return buildZeroState(totalSemesters);
  }

  // Calculate semester boundaries (each semester = courseDurationMonths months)
  const allSemesters: SemesterStatus[] = [];
  let currentSemester = 1;
  let semesterDay = 1;
  let totalSemesterDays = 0;
  let currentSemesterStart = startDate;
  let currentSemesterEnd = addMonths(startDate, courseDurationMonths);

  for (let sem = 1; sem <= totalSemesters; sem++) {
    const semStart = addMonths(startDate, (sem - 1) * courseDurationMonths);
    const semEnd = addMonths(startDate, sem * courseDurationMonths);
    const semTotalDays = daysBetween(semStart, semEnd);

    let status: 'completed' | 'current' | 'locked';
    let progressPercent = 0;

    if (today >= semEnd) {
      status = 'completed';
      progressPercent = 100;
    } else if (today >= semStart) {
      status = 'current';
      const daysIn = daysBetween(semStart, today) + 1; // +1 so Day 1 is the start day
      progressPercent = Math.min(100, Math.round((daysIn / semTotalDays) * 100));
      currentSemester = sem;
      semesterDay = Math.min(daysIn, semTotalDays);
      totalSemesterDays = semTotalDays;
      currentSemesterStart = semStart;
      currentSemesterEnd = semEnd;
    } else {
      status = 'locked';
    }

    allSemesters.push({
      number: sem,
      status,
      startDate: semStart.toISOString().split('T')[0],
      endDate: semEnd.toISOString().split('T')[0],
      progressPercent,
    });
  }

  const courseComplete = today >= addMonths(startDate, totalSemesters * courseDurationMonths);

  // If course is complete, set to last semester
  if (courseComplete) {
    currentSemester = totalSemesters;
    semesterDay = totalSemesterDays;
  }

  const daysRemaining = Math.max(0, daysBetween(today, currentSemesterEnd));
  const semesterProgress = allSemesters.find(s => s.number === currentSemester)?.progressPercent ?? 0;

  // Overall: (completed semesters + current progress) / total semesters
  const completedSemesters = allSemesters.filter(s => s.status === 'completed').length;
  const overallProgress = Math.round(
    ((completedSemesters + semesterProgress / 100) / totalSemesters) * 100
  );

  return {
    currentSemester,
    semesterDay,
    totalSemesterDays,
    semesterProgress,
    overallProgress,
    semesterProgressPercent: semesterProgress,
    overallProgressPercent: overallProgress,
    isCourseComplete: courseComplete,
    semesterLabel: `Semester ${currentSemester} · Day ${semesterDay} of ${totalSemesterDays}`,
    daysRemaining,
    currentSemesterStart: currentSemesterStart.toISOString().split('T')[0],
    currentSemesterEnd: currentSemesterEnd.toISOString().split('T')[0],
    allSemesters,
  };
}

/**
 * Returns a time-appropriate greeting string.
 */
export function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Formats a date string for display (e.g. "14 Sep 2026")
 */
export function formatDisplayDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

/**
 * Returns how many days there are between two dates (non-negative).
 * daysBetween(earlier, later) = positive
 */
function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((b.getTime() - a.getTime()) / msPerDay);
}

/**
 * Adds N months to a date without mutating the original.
 * Handles end-of-month edge cases (e.g. Jan 31 + 1 month = Feb 28).
 */
function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const targetMonth = d.getMonth() + months;
  d.setMonth(targetMonth);
  // If day rolled over (e.g. Jan 31 → Mar 3), go back to last day of intended month
  if (d.getDate() !== date.getDate()) {
    d.setDate(0);
  }
  return d;
}

/**
 * Parse a 'YYYY-MM-DD' string as a LOCAL date (not UTC).
 * Avoids the UTC-midnight timezone-offset bug.
 */
function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
}

/**
 * Zero state returned when no course start date is set.
 */
function buildZeroState(totalSemesters: number): SemesterInfo {
  const allSemesters: SemesterStatus[] = Array.from({ length: totalSemesters }, (_, i) => ({
    number: i + 1,
    status: 'locked' as const,
    startDate: '',
    endDate: '',
    progressPercent: 0,
  }));
  return {
    currentSemester: 1,
    semesterDay: 0,
    totalSemesterDays: 182,
    semesterProgress: 0,
    overallProgress: 0,
    semesterProgressPercent: 0,
    overallProgressPercent: 0,
    isCourseComplete: false,
    semesterLabel: 'Semester 1 · Day 0',
    daysRemaining: 182,
    currentSemesterStart: '',
    currentSemesterEnd: '',
    allSemesters,
  };
}
