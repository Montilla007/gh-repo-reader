class RepoController {
  // --- Sorting ---
  static sortByLatest(repos) {
    return [...repos].sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );
  }

  static sortAlphabetically(repos) {
    return [...repos].sort((a, b) => a.name.localeCompare(b.name));
  }

  static sortByStars(repos) {
    return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
  }

  static filterByMinStars(repos, minStars = 0) {
    return repos.filter((repo) => repo.stargazers_count >= minStars);
  }

  // --- Query / Search ---
  static getByName(repos, name) {
    return (
      repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase()) ||
      null
    );
  }

  static searchByDescription(repos, keyword) {
    return repos.filter(
      (repo) =>
        repo.description &&
        repo.description.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  static filterByLanguage(repos, language) {
    return repos.filter(
      (repo) =>
        repo.language && repo.language.toLowerCase() === language.toLowerCase()
    );
  }

  // --- Latest / commits ---
  static latestUpdated(repos) {
    if (!repos.length) return null;
    return [...repos].sort(
      (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)
    )[0];
  }

  static updatedWithinDays(repos, days = 7) {
    const now = new Date();
    return repos.filter((repo) => {
      const pushedDate = new Date(repo.pushed_at);
      const diffDays = (now - pushedDate) / (1000 * 60 * 60 * 24);
      return diffDays <= days;
    });
  }

  static topByStars(repos, topN = 5) {
    return [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, topN);
  }

  // --- Summarize ---
  static summarize(repos) {
    return repos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      lastUpdated: repo.pushed_at,
    }));
  }

  /**
   * Get a specific image from a folder by name prefix
   * @param {Array} repoFiles - Array of file objects from GitHub API
   * @param {string} folderName - Folder to look inside (default: 'assets')
   * @param {string} imageName - Name of the image without extension (default: 'main')
   * @returns {string|null} URL of the image or null if not found
   */
  static getImage(repoFiles, folderName = "assets", imageName = "main") {
    if (!repoFiles || !Array.isArray(repoFiles)) return null;

    const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg"];

    const targetFile = repoFiles.find((file) => {
      const fileName = file.name.toLowerCase();
      return (
        file.path.startsWith(`${folderName}/`) &&
        imageExtensions.some(
          (ext) => fileName === `${imageName.toLowerCase()}${ext}`
        )
      );
    });

    return targetFile ? targetFile.download_url : null;
  }
}

module.exports = RepoController;
