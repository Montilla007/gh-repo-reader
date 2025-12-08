class RepoController {
    static sortByLatest(repos) {
        return [...repos].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    static sortAlphabetically(repos) {
        return [...repos].sort((a, b) => a.name.localeCompare(b.name));
    }

    static sortByStars(repos) {
        return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
    }

    static filterByMinStars(repos, minStars = 0) {
        return repos.filter(repo => repo.stargazers_count >= minStars);
    }
}

module.exports = RepoController;
