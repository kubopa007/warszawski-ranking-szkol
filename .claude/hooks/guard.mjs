// PreToolUse guard: blocks access to .env files (except .env.example) and dangerous shell commands.
// Exit code 2 blocks the tool call and shows stderr to Claude. Any other failure fails open,
// so settings.json `permissions.deny` stays the primary hard limit.
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8').trimStart());
const tool = input.tool_name ?? '';
const args = input.tool_input ?? {};

const ENV_FILE = /(?:^|[\\/\s'"=:(])\.env(?:\.[\w.-]+)?(?=$|[\s'"\\/;|&)>])/g;

function envRefs(text) {
  return [...String(text).matchAll(ENV_FILE)]
    .map((m) => m[0].replace(/^[\\/\s'"=:(]/, ''))
    .filter((name) => name !== '.env.example');
}

const DANGEROUS = [
  [/\bgit\s+push\b.*(\s-f\b|--force|\s\+\S)/, 'force push'],
  [/\bgit\s+push\b.*[\s:]main(\s|$)/, 'push do main — zmiany na main tylko przez PR'],
  [/\bgit\s+push\b.*(--delete\b|\s-d\b|\s:\S)/, 'usunięcie zdalnego brancha'],
  [/\bgit\s+push\b.*--(all|mirror)\b/, 'git push --all/--mirror'],
  [/\bgit\s+reset\s+--hard\b/, 'git reset --hard'],
  [/\bgit\s+clean\s+-\w*f/, 'git clean -f'],
  [/\bgit\s+branch\s+-D\b/, 'git branch -D'],
  [/\bgit\s+(checkout|restore)\s+(--\s+)?\.(\s|$)/, 'odrzucenie wszystkich zmian'],
  [/--no-verify\b/, '--no-verify (pomijanie hooków)'],
  [/\brm\s+-\w*r\w*f\w*\b|\brm\s+-\w*f\w*r\w*\b/, 'rm -rf'],
  [/\bRemove-Item\b[^|;]*-Recurse\b/i, 'Remove-Item -Recurse'],
  [/\b(npm|pnpm|yarn)\s+publish\b/, 'publikacja paczki'],
  [/\bgh\s+pr\s+merge\b/, 'gh pr merge — merge robi właściciel'],
  [/\bgh\s+repo\s+(delete|edit)\b/, 'zmiana/usunięcie repozytorium'],
  [/\bvercel\b.*--prod\b/, 'deploy produkcyjny'],
];

function block(reason) {
  process.stderr.write(
    `Zablokowane przez .claude/hooks/guard.mjs: ${reason}. Poproś właściciela o wykonanie lub zgodę.\n`,
  );
  process.exit(2);
}

if (tool === 'Bash' || tool === 'PowerShell') {
  const cmd = String(args.command ?? '');
  const env = envRefs(cmd);
  if (env.length) block(`dostęp do pliku sekretów (${env.join(', ')})`);
  for (const [re, why] of DANGEROUS) if (re.test(cmd)) block(why);
} else {
  const target = [args.file_path, args.path, args.notebook_path, args.pattern, args.glob]
    .filter(Boolean)
    .join(' ');
  const env = envRefs(target);
  if (env.length) block(`dostęp do pliku sekretów (${env.join(', ')})`);
}

process.exit(0);
