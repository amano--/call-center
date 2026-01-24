import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILLS_ROOT = path.resolve(__dirname, '../.gemini/antigravity/skills');

function log(msg) { console.log(`[SkillCompleter] ${msg}`); }

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};
    const frontmatter = {};
    const lines = match[1].split('\n');
    for (const line of lines) {
        const [key, ...rest] = line.split(':');
        if (key && rest.length) {
            frontmatter[key.trim()] = rest.join(':').trim();
        }
    }
    return frontmatter;
}

function processSkillDir(dir) {
    const skillMd = path.join(dir, 'SKILL.md');
    if (!fs.existsSync(skillMd)) return;

    const content = fs.readFileSync(skillMd, 'utf-8');
    const frontmatter = parseFrontmatter(content);
    const skillName = frontmatter.name || path.basename(dir);
    const skillDesc = frontmatter.description || 'No description provided.';

    // 1. Generate metadata.json
    const metadataPath = path.join(dir, 'metadata.json');
    if (!fs.existsSync(metadataPath)) {
        const metadata = {
            name: skillName,
            description: skillDesc,
            version: "1.0.0",
            files: [
                "SKILL.md",
                "SKILL.ja.md" // We promise this will exist
            ]
        };
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        log(`Created metadata.json for ${skillName}`);
    }

    // 2. Generate SKILL.ja.md
    const skillJaMd = path.join(dir, 'SKILL.ja.md');
    if (!fs.existsSync(skillJaMd)) {
        // Create a copy but prefix with a note
        // In a real scenario, we might want to use a translation API.
        // For now, we clone the English file to ensure structure completeness.
        const jaContent = [
            '---',
            `name: ${skillName} (JP)`,
            `description: ${skillDesc} (JP)`,
            'language: ja',
            '---',
            '',
            '> **Note**: This is a placeholder for the Japanese translation.',
            '> **注記**: これは日本語訳のプレースホルダーです。現在は英語版の内容が含まれています。',
            '',
            content.replace(/^---\n[\s\S]*?\n---\n/, '') // Remove original frontmatter to avoid duplication
        ].join('\n');

        fs.writeFileSync(skillJaMd, jaContent);
        log(`Created SKILL.ja.md for ${skillName}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    let hasSkill = false;
    for (const file of files) {
        if (file === 'SKILL.md') hasSkill = true;
    }

    if (hasSkill) {
        processSkillDir(dir);
    }

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        }
    }
}

async function start() {
    log(`Scanning ${SKILLS_ROOT}...`);
    if (fs.existsSync(SKILLS_ROOT)) {
        walk(SKILLS_ROOT);
    } else {
        console.error(`Root not found: ${SKILLS_ROOT}`);
    }
    log('Complete.');
}

start();
