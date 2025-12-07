const RepoController = require("../Controllers/RepoController");

const mockRepos = [
    { name: "B", stargazers_count: 2, updated_at: "2025-01-01T00:00:00Z" },
    { name: "A", stargazers_count: 5, updated_at: "2025-02-01T00:00:00Z" },
];

describe("RepoController", () => {
    it("sortByLatest should sort repos by updated_at descending", () => {
        const sorted = RepoController.sortByLatest(mockRepos);
        expect(sorted[0].name).toBe("A");
    });

    it("sortAlphabetically should sort by name", () => {
        const sorted = RepoController.sortAlphabetically(mockRepos);
        expect(sorted[0].name).toBe("A");
    });

    it("sortByStars should sort descending by stars", () => {
        const sorted = RepoController.sortByStars(mockRepos);
        expect(sorted[0].stargazers_count).toBe(5);
    });

    it("filterByMinStars should filter repos correctly", () => {
        const filtered = RepoController.filterByMinStars(mockRepos, 3);
        expect(filtered.length).toBe(1);
        expect(filtered[0].stargazers_count).toBe(5);
    });
});
