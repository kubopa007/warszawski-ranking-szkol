---
name: debug
description: Systematic debugging of a failing test, error or unexpected behavior — reproduce, isolate, fix root cause, add a regression test.
argument-hint: <error message, failing test or symptom>
---

Debug: $ARGUMENTS

1. **Reproduce** with the narrowest command (single test file / filter). Capture only the relevant error lines (trim stack traces to project frames).
2. **Hypothesize**: list at most 3 likely causes, most likely first, each with how to confirm it.
3. **Isolate**: confirm one hypothesis with a targeted read, log or test. Don't read unrelated files.
4. **Fix the root cause**, not the symptom. Never weaken assertions, add `any`, or skip tests to get green.
5. **Regression test** that fails before the fix and passes after.
6. Run the package tests, then `pnpm check`.

Loop guard: if two attempts fail, or a fix needs a design change, stop and report findings + options in Polish. Remove temporary debug logging before finishing.
