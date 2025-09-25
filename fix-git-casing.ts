import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function getGitTrackedFiles(): string[] {
  const stdout = execSync('git ls-files', { encoding: 'utf8' });
  return stdout.split('\n').filter(Boolean);
}

function getActualPathCase(filePath: string): string | null {

  const parts = filePath.split('/');
  let currentPath = process.cwd();

  for (const part of parts) {
    const entries = fs.readdirSync(currentPath);
    const matched = entries.find(e => e.toLowerCase() === part.toLowerCase());
    if (!matched) return null; 
    currentPath = path.join(currentPath, matched);
  }

  return path.relative(process.cwd(), currentPath);
}

function escapeForShell(str: string): string {
  if (process.platform === 'win32') {

    return `"${str.replace(/(["^&|<>])/g, '^$1')}"`;
  } else {

    return `'${str.replace(/'/g, `'\\''`)}'`;
  }
}

function fixCasing() {
  const files = getGitTrackedFiles();

  files.forEach((file) => {
    const actual = getActualPathCase(file);
    if (!actual) {
      console.warn(`File missing on disk: ${file}`);
      return;
    }

    if (file !== actual) {
      console.log(`Fixing casing: "${file}" -> "${actual}"`);

      const tempName = file + '.tmp_case_fix';

      try {
        execSync(`git mv ${escapeForShell(file)} ${escapeForShell(tempName)}`);
        execSync(`git mv ${escapeForShell(tempName)} ${escapeForShell(actual)}`);
      } catch (err) {
        console.error(`Failed to rename ${file}:`, (err as Error).message);
      }
    }
  });

  console.log('Done casing fixes. Don’t forget to commit the changes!');
}

fixCasing();
