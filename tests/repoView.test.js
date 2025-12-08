const RepoView = require("../github-api-wrapper/lib/RepoView");

describe("RepoView", () => {
    it("should list all repos without throwing", () => {
        const repos = [
            { name: "TestRepo", stargazers_count: 5, forks_count: 2, language: "JS", updated_at: "2025-01-01T00:00:00Z" }
        ];

        expect(() => RepoView.listAll(repos)).not.toThrow();
    });
});
