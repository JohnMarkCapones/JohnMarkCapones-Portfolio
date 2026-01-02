/**
 * GitHub API Service
 * Fetch live data from GitHub API
 */

/**
 * GitHub User Data
 */
export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

/**
 * GitHub Repository Data
 */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

/**
 * GitHub Commit Data
 */
export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

/**
 * GitHub Contribution Day
 */
export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/**
 * GitHub Stats Summary
 */
export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  followers: number;
  contributions: number;
}

const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'JohnMarkCapones';

/**
 * Fetch with error handling
 */
async function fetchGitHub<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('GitHub API fetch error:', error);
    return null;
  }
}

/**
 * Get user profile data
 */
export async function getGitHubUser(): Promise<GitHubUser | null> {
  return fetchGitHub<GitHubUser>(`/users/${USERNAME}`);
}

/**
 * Get user repositories
 */
export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const repos = await fetchGitHub<GitHubRepo[]>(
    `/users/${USERNAME}/repos?sort=updated&per_page=100`
  );
  return repos || [];
}

/**
 * Get pinned/featured repositories
 * Returns top 6 repos by stars
 */
export async function getPinnedRepos(): Promise<GitHubRepo[]> {
  const repos = await getGitHubRepos();
  return repos
    .filter((repo) => !repo.name.includes('fork'))
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
}

/**
 * Get recent commits across all repos
 */
export async function getRecentCommits(limit = 10): Promise<GitHubCommit[]> {
  const repos = await getGitHubRepos();
  const allCommits: GitHubCommit[] = [];

  // Fetch commits from top 5 most recently updated repos
  const recentRepos = repos.slice(0, 5);

  for (const repo of recentRepos) {
    const commits = await fetchGitHub<GitHubCommit[]>(
      `/repos/${repo.full_name}/commits?per_page=5&author=${USERNAME}`
    );

    if (commits) {
      allCommits.push(...commits);
    }
  }

  // Sort by date and return latest
  return allCommits
    .sort((a, b) => {
      const dateA = new Date(a.commit.author.date).getTime();
      const dateB = new Date(b.commit.author.date).getTime();
      return dateB - dateA;
    })
    .slice(0, limit);
}

/**
 * Calculate GitHub stats summary
 */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  const user = await getGitHubUser();
  const repos = await getGitHubRepos();

  if (!user) return null;

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  return {
    totalStars,
    totalForks,
    totalRepos: user.public_repos,
    followers: user.followers,
    contributions: 0, // Will be calculated from contribution graph
  };
}

/**
 * Generate mock contribution data
 * In production, you'd use GitHub GraphQL API with authentication
 * or scrape the contribution graph from your profile page
 */
export function getMockContributions(): ContributionDay[] {
  const contributions: ContributionDay[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 365); // Last year

  // Generate mock data
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // Simulate realistic contribution pattern
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseCount = isWeekend ? 0 : Math.floor(Math.random() * 15);

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (baseCount > 10) level = 4;
    else if (baseCount > 7) level = 3;
    else if (baseCount > 3) level = 2;
    else if (baseCount > 0) level = 1;

    contributions.push({
      date: date.toISOString().split('T')[0] || '',
      count: baseCount,
      level,
    });
  }

  return contributions;
}

/**
 * Get contribution stats from contribution data
 */
export function getContributionStats(contributions: ContributionDay[]) {
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
  const currentStreak = calculateCurrentStreak(contributions);
  const longestStreak = calculateLongestStreak(contributions);

  return {
    totalContributions,
    currentStreak,
    longestStreak,
  };
}

/**
 * Calculate current streak
 */
function calculateCurrentStreak(contributions: ContributionDay[]): number {
  let streak = 0;
  const sortedContributions = [...contributions].reverse(); // Most recent first

  for (const day of sortedContributions) {
    if (day.count > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Calculate longest streak
 */
function calculateLongestStreak(contributions: ContributionDay[]): number {
  let maxStreak = 0;
  let currentStreak = 0;

  for (const day of contributions) {
    if (day.count > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
}
