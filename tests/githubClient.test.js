const GitHubClient = require("../github-api-wrapper/lib/GitHubClient");

describe("GitHubClient", () => {
    it("should fetch repos for a valid user", async () => {
        const client = new GitHubClient("octocat");
        const repos = await client.getRepos();
        expect(Array.isArray(repos)).toBe(true);
    });

    it("should throw error for missing username", () => {
        expect(() => new GitHubClient()).toThrow("GitHub username is required.");
    });
});
