import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
// We assume this script is running in any-forward/buy-forward/scripts/
const REPO_ROOT = path.resolve(__dirname, '..');
const AGENT_SKILLS_DIR = path.resolve(REPO_ROOT, '.gemini/antigravity/skills');

// The user specified source path: any-foward/skills
// Since run_command 'find' output showed .gemini is in buy-forward, 
// and user workspace has any-forward/skills and any-forward/buy-forward as siblings (likely).
// Let's try to resolve ../skills from REPO_ROOT.
const SOURCE_SKILLS_DIR = path.resolve(REPO_ROOT, '../skills');
const PLUGINS_DIR = path.join(SOURCE_SKILLS_DIR, 'plugins');

const TARGET_FOLDER_NAME = 'trailofbits-security'; // Correcting 'securty' to 'security'

function log(msg) { console.log(`[SkillManager] ${msg}`); }

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(src, dest) {
    if (fs.statSync(src).isDirectory()) {
        ensureDir(dest);
        for (const child of fs.readdirSync(src)) {
            copyRecursive(path.join(src, child), path.join(dest, child));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

function addFrontmatterIfMissing(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    if (content.trim().startsWith('---')) return; // Already has frontmatter

    const dirName = path.basename(path.dirname(filePath));
    const lines = content.split('\n');
    let description = 'Imported skill';
    
    // Attempt to extract title/description
    for (const line of lines) {
        if (line.trim().length > 0 && !line.startsWith('#')) {
            // Take first meaningful line as description
            description = line.trim().substring(0, 150).replace(/:/g, '') + '...';
            break;
        }
    }

    const frontmatter = [
        '---',
        `name: ${dirName}`,
        `description: ${description}`,
        '---',
        '',
        ''
    ].join('\n');

    fs.writeFileSync(filePath, frontmatter + content);
    log(`✅ Added frontmatter to ${path.relative(AGENT_SKILLS_DIR, filePath)}`);
}

async function start() {
    // Part 1: Import Trail of Bits Skills if source exists
    if (!fs.existsSync(PLUGINS_DIR)) {
        log(`Warning: content directory not found at ${PLUGINS_DIR}. Skipping import.`);
    } else {
        log(`Found plugins at ${PLUGINS_DIR}. Importing to ${TARGET_FOLDER_NAME}...`);
        const targetBase = path.join(AGENT_SKILLS_DIR, TARGET_FOLDER_NAME);
        ensureDir(targetBase);

        const pluginDirs = fs.readdirSync(PLUGINS_DIR);
        let importCount = 0;

        for (const pDir of pluginDirs) {
            if (pDir.startsWith('.')) continue; // ignore keys like .DS_Store
            const fullPDir = path.join(PLUGINS_DIR, pDir);
            if (!fs.statSync(fullPDir).isDirectory()) continue;

            // Look for skills inside
            // Structure: plugins/<plugin>/skills/<skill>/SKILL.md
            const skillsSub = path.join(fullPDir, 'skills');
            if (fs.existsSync(skillsSub) && fs.statSync(skillsSub).isDirectory()) {
                const skillFolders = fs.readdirSync(skillsSub);
                for (const sf of skillFolders) {
                    const skillPath = path.join(skillsSub, sf);
                    const skillMdPath = path.join(skillPath, 'SKILL.md');
                    if (fs.existsSync(skillMdPath)) {
                        // Destination: trailofbits-security/<skill-name>
                        const dest = path.join(targetBase, sf);
                        // log(`Importing ${sf}...`);
                        copyRecursive(skillPath, dest);
                        importCount++;
                    }
                }
            }
        }
        log(`Imported ${importCount} skills from Trail of Bits.`);
    }

    // Part 2: Scan ALL skills in AGENT_SKILLS_DIR and fix formatting
    log(`Scanning ${AGENT_SKILLS_DIR} for formatting...`);
    
    function scanDir(dir) {
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
            const fullPath = path.join(dir, entry);
            if (fs.statSync(fullPath).isDirectory()) {
                scanDir(fullPath);
            } else if (entry === 'SKILL.md') {
                addFrontmatterIfMissing(fullPath);
            }
        }
    }

    if (fs.existsSync(AGENT_SKILLS_DIR)) {
        scanDir(AGENT_SKILLS_DIR);
    } else {
        log(`Target skills directory does not exist: ${AGENT_SKILLS_DIR}`);
    }

    log('All operations complete.');
}

start();
