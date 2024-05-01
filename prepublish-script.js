const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
const readmePath = path.join(__dirname, 'README.md');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// Regular expression to find the version placeholder text in README.md
const versionRegex = /<!-- version -->\n\*\*Version:\*\* \d+\.\d+\.\d+\n<!-- versionend -->/;

// Read README.md
let readmeContent = fs.readFileSync(readmePath, 'utf8');

// Replace the version placeholder with the actual version
readmeContent = readmeContent.replace(versionRegex, `<!-- version -->\n**Version:** ${version}\n<!-- versionend -->`);

// Write README.md
fs.writeFileSync(readmePath, readmeContent);
