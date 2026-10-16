import { describe, expect, it } from 'vitest';
import { RANKING_ENGINE_STATUS } from './index.js';

// Toolchain smoke test; replace with real ranking tests on reference data.
describe('@wrs/ranking', () => {
  it('is wired into the workspace', () => {
    expect(RANKING_ENGINE_STATUS).toBe('not-implemented');
  });
});
