// PostToolUse: format the edited file with the project's Prettier. Never blocks (always exit 0).
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

try {
  const input = JSON.parse(readFileSync(0, 'utf8').trimStart());
  const file = input.tool_input?.file_path;
  const root = process.env.CLAUDE_PROJECT_DIR ?? input.cwd ?? process.cwd();
  const prettier = join(root, 'node_modules', 'prettier', 'bin', 'prettier.cjs');
  const formattable = /\.(c|m)?(j|t)sx?$|\.(json|md|ya?ml|css)$/i;

  if (file && formattable.test(file) && existsSync(file) && existsSync(prettier)) {
    spawnSync(
      process.execPath,
      [prettier, '--write', '--ignore-unknown', '--log-level=warn', file],
      {
        cwd: root,
        stdio: 'ignore',
        timeout: 20000,
      },
    );
  }
} catch {
  // Formatting is best-effort; `pnpm check` is the real gate.
}
process.exit(0);
