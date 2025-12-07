/**
 * GitHub API Wrapper
 * Only fetches all repositories of a user
 */

const BASE_URL = "https://api.github.com";

class GitHubClient {
    constructor(username) {
        if (!username) throw new Error("GitHub username is required.");
        this.username = username;
    }

    // Fetch all repositories of the user
    async getRepos() {
        const response = await fetch(`${BASE_URL}/users/${this.username}/repos`, {
            headers: { "User-Agent": "gh-repo-reader" }
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    }
}

module.exports = GitHubClient;
