import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target base directory for Antigravity skills
const TARGET_BASE_DIR = path.resolve(
  __dirname,
  "../.gemini/antigravity/skills",
);

// Get source directory from command line args
const sourceDir = process.argv[2];

if (!sourceDir) {
  console.error(
    "Usage: node scripts/import-claude-skills.js <path-to-claude-skills-folder>",
  );
  process.exit(1);
}

if (!fs.existsSync(sourceDir)) {
  console.error(`Error: Source directory not found: ${sourceDir}`);
  process.exit(1);
}

// Create target base directory if it doesn't exist
if (!fs.existsSync(TARGET_BASE_DIR)) {
  fs.mkdirSync(TARGET_BASE_DIR, { recursive: true });
}

async function start() {
  const files = fs.readdirSync(sourceDir);
  let convertedCount = 0;

  for (const file of files) {
    if (path.extname(file) !== ".md") continue;

    // Skip if it is a directory
    const fullPath = path.join(sourceDir, file);
    if (fs.statSync(fullPath).isDirectory()) continue;

    const skillName = path
      .basename(file, ".md")
      .toLowerCase()
      .replace(/\s+/g, "-");
    const skillContent = fs.readFileSync(fullPath, "utf-8");

    // Create specific skill directory
    const skillDir = path.join(TARGET_BASE_DIR, skillName);
    if (!fs.existsSync(skillDir)) {
      fs.mkdirSync(skillDir, { recursive: true });
    }

    const targetFile = path.join(skillDir, "SKILL.md");

    // Prepare content with frontmatter
    let outputContent = skillContent;

    // Check if it already has frontmatter
    if (!skillContent.trim().startsWith("---")) {
      const description =
        skillContent
          .split("\n")
          .find((line) => line.trim().length > 0 && !line.startsWith("#"))
          ?.trim() || `Imported skill: ${skillName}`;

      const frontmatter = [
        "---",
        `name: ${skillName}`,
        `description: ${description.substring(0, 100).replace(/:/g, "")}`, // Simple escape
        "---",
        "",
        "",
      ].join("\n");

      outputContent = frontmatter + skillContent;
    }

    // Write file
    fs.writeFileSync(targetFile, outputContent);
    console.log(`✅ Imported: ${skillName} -> ${targetFile}`);
    convertedCount++;
  }

  console.log(
    `\nDone! Imported ${convertedCount} skills to ${TARGET_BASE_DIR}`,
  );
}

start();
