const fs = require("fs");
const path = require("path");

const newVersion = process.argv[2];

const pkgPath = path.join(__dirname, "..", "github-api-wrapper", "package.json");

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

pkg.version = newVersion;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

console.log(`Updated github-api-wrapper version to ${newVersion}`);
