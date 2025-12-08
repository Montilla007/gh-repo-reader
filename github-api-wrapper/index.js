const GitHubClient = require('./lib/GitHubClient');
const RepoController = require('./lib/RepoController');
const RepoView = require('./lib/RepoView');

module.exports = {
    /**
     * Fetch all repositories for a username
     * @param {string} username
     * @returns {Promise<Array>} list of repos
     */
    fetch: async (username) => {
        const client = new GitHubClient(username);
        return await client.getRepos();
    },

    // Sorting methods
    sortByLatest: RepoController.sortByLatest,
    sortAlphabetically: RepoController.sortAlphabetically,
    sortByStars: RepoController.sortByStars,
    filterByMinStars: RepoController.filterByMinStars,

    // Optional: CLI display
    view: RepoView
};
