const fs = require("fs");
const path = require("path");

const dirs = [
  path.join(__dirname, "src/pages"),
  path.join(__dirname, "src/components")
];

function checkSections(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkSections(fullPath);
    } else if (fullPath.endsWith(".jsx")) {
      const content = fs.readFileSync(fullPath, "utf-8");
      // Find all opening section tags
      const sectionTagRegex = /<section\b[^>]*>/g;
      let match;
      while ((match = sectionTagRegex.exec(content)) !== null) {
        let tag = match[0];
        if (!tag.includes("className")) {
            console.log(`[NO CLASSNAME] ${file}: ${tag}`);
        } else if (!tag.includes("py-")) {
            console.log(`[MISSING PY] ${file}: ${tag}`);
        }
      }
    }
  }
}

checkSections(dirs[0]);
checkSections(dirs[1]);
console.log("Section check complete.");
