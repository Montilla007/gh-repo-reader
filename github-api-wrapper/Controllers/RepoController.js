/**
 * RepoController
 * Processes repository data: sorting, filtering, aggregating
 */

class RepoController {
    // Sort repos by latest update
    static sortByLatest(repos) {
        return [...repos].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    // Sort repos alphabetically
    static sortAlphabetically(repos) {
        return [...repos].sort((a, b) => a.name.localeCompare(b.name));
    }

    // Sort by stars descending
    static sortByStars(repos) {
        return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
    }

    // Filter repos by minimum stars
    static filterByMinStars(repos, minStars = 0) {
        return repos.filter(repo => repo.stargazers_count >= minStars);
    }
}

module.exports = RepoController;
