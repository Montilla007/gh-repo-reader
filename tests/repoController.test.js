const repo = require("../github-api-wrapper/lib/RepoController");

const mockRepos = [
  {
    name: "B",
    stargazers_count: 2,
    updated_at: "2025-01-01T00:00:00Z",
    pushed_at: "2025-01-01T00:00:00Z",
    description: "This is repo B",
    language: "JavaScript",
  },
  {
    name: "A",
    stargazers_count: 5,
    updated_at: "2025-02-01T00:00:00Z",
    pushed_at: "2025-02-01T00:00:00Z",
    description: "Repo A demo",
    language: "TypeScript",
  },
];

const mockFiles = [
  {
    path: "assets/main.jpeg",
    name: "main.jpeg",
    download_url: "assets/main.jpeg",
  },
  {
    path: "assets/logo.png",
    name: "logo.png",
    download_url: "assets/logo.png",
  },
];

describe("RepoController Sorting & Filtering", () => {
  test("sortByLatest should sort repos by updated_at descending", () => {
    const sorted = repo.sortByLatest(mockRepos);
    console.log("sortByLatest result:", sorted.map(r => r.name));
    expect(sorted[0].name).toBe("A");
    expect(sorted[1].name).toBe("B");
  });

  test("sortAlphabetically should sort repos by name", () => {
    const sorted = repo.sortAlphabetically(mockRepos);
    console.log("sortAlphabetically result:", sorted.map(r => r.name));
    expect(sorted[0].name).toBe("A");
    expect(sorted[1].name).toBe("B");
  });

  test("sortByStars should sort descending by stars", () => {
    const sorted = repo.sortByStars(mockRepos);
    console.log("sortByStars result:", sorted.map(r => r.stargazers_count));
    expect(sorted[0].stargazers_count).toBe(5);
    expect(sorted[1].stargazers_count).toBe(2);
  });

  test("filterByMinStars should filter repos correctly", () => {
    const filtered = repo.filterByMinStars(mockRepos, 3);
    console.log("filterByMinStars result:", filtered.map(r => r.stargazers_count));
    expect(filtered.length).toBe(1);
    expect(filtered[0].stargazers_count).toBe(5);
  });

  test("getByName should return correct repo", () => {
    const found = repo.getByName(mockRepos, "A");
    console.log("getByName('A') result:", found);
    expect(found.name).toBe("A");

    const notFound = repo.getByName(mockRepos, "NonExist");
    console.log("getByName('NonExist') result:", notFound);
    expect(notFound).toBeNull();
  });

  test("searchByDescription should filter by keyword", () => {
    const result = repo.searchByDescription(mockRepos, "demo");
    console.log("searchByDescription('demo') result:", result.map(r => r.name));
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("A");
  });

  test("filterByLanguage should filter repos by language", () => {
    const result = repo.filterByLanguage(mockRepos, "JavaScript");
    console.log("filterByLanguage('JavaScript') result:", result.map(r => r.name));
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("B");
  });

  test("latestUpdated should return most recently pushed repo", () => {
    const latest = repo.latestUpdated(mockRepos);
    console.log("latestUpdated result:", latest.name);
    expect(latest.name).toBe("A");
  });

  test("updatedWithinDays should filter repos updated recently", () => {
    const now = new Date("2025-02-10T00:00:00Z");
    jest.useFakeTimers().setSystemTime(now);

    const recent = repo.updatedWithinDays(mockRepos, 15);
    console.log("updatedWithinDays(15) result:", recent.map(r => r.name));
    expect(recent.length).toBe(1);
    expect(recent[0].name).toBe("A");

    jest.useRealTimers();
  });

  test("topByStars should return top N repos", () => {
    const top = repo.topByStars(mockRepos, 1);
    console.log("topByStars(1) result:", top.map(r => r.stargazers_count));
    expect(top.length).toBe(1);
    expect(top[0].stargazers_count).toBe(5);
  });

  test("summarize should return correct structure", () => {
    const summary = repo.summarize(mockRepos);
    console.log("summarize result:", summary);
    expect(summary[0]).toHaveProperty("name");
    expect(summary[0]).toHaveProperty("description");
    expect(summary[0]).toHaveProperty("stars");
    expect(summary[0]).toHaveProperty("language");
    expect(summary[0]).toHaveProperty("lastUpdated");
  });

  test("getImage should return customized image by name", () => {
    const mainImage = repo.getImage(mockFiles, "assets", "main");
    console.log("getImage('main') result:", mainImage);
    expect(mainImage).toBe("assets/main.jpeg");

    const logoImage = repo.getImage(mockFiles, "assets", "logo");
    console.log("getImage('logo') result:", logoImage);
    expect(logoImage).toBe("assets/logo.png");

    const nonExist = repo.getImage(mockFiles, "assets", "notfound");
    console.log("getImage('notfound') result:", nonExist);
    expect(nonExist).toBeNull();
  });
});
