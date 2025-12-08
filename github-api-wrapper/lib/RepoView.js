class RepoView {
    static listAll(repos) {
        repos.forEach((repo, index) => {
            console.log(`${index + 1}. ${repo.name}`);
            console.log(`   ⭐ Stars: ${repo.stargazers_count}`);
            console.log(`   🍴 Forks: ${repo.forks_count}`);
            console.log(`   📝 Language: ${repo.language || "N/A"}`);
            console.log(`   ⏰ Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}`);
            console.log("--------------------------------------------------");
        });
    }
}

module.exports = RepoView;
