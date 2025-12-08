// If testing your published package:
const repo = require('../github-api-wrapper/lib/RepoController');

const mockRepos = [
  { name: "B", stargazers_count: 2, updated_at: "2025-01-01T00:00:00Z" },
  { name: "A", stargazers_count: 5, updated_at: "2025-02-01T00:00:00Z" },
];

describe("RepoController Sorting & Filtering", () => {
  test("sortByLatest should sort repos by updated_at descending", () => {
    const sorted = repo.sortByLatest(mockRepos);
    expect(sorted[0].name).toBe("A");
    expect(sorted[1].name).toBe("B");
  });

  test("sortAlphabetically should sort repos by name", () => {
    const sorted = repo.sortAlphabetically(mockRepos);
    expect(sorted[0].name).toBe("A");
    expect(sorted[1].name).toBe("B");
  });

  test("sortByStars should sort descending by stars", () => {
    const sorted = repo.sortByStars(mockRepos);
    expect(sorted[0].stargazers_count).toBe(5);
    expect(sorted[1].stargazers_count).toBe(2);
  });

  test("filterByMinStars should filter repos correctly", () => {
    const filtered = repo.filterByMinStars(mockRepos, 3);
    expect(filtered.length).toBe(1);
    expect(filtered[0].stargazers_count).toBe(5);
  });
});
