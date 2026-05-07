# Performance benchmark — https://www.ceusunsw.com/

**Mode:** Quick (single pass, no baseline)  
**Date:** 2026-05-05  
**Branch:** main  
**Tooling:** gstack `browse` (headless), commands `goto`, `perf`, `js`

## Summary

The homepage responds quickly in this automated session: **TTFB ~7 ms**, **FCP ~48 ms**, **full load ~45 ms** on repeat navigations (often served from **cache**, `h2`). **LCP** could not be read from `performance.getEntriesByType('largest-contentful-paint')` after `wait --networkidle` (empty array). For LCP, use Lighthouse or real-user monitoring.

## Browse `perf` (last run after network idle)

| Phase        | Time |
|-------------|------|
| TTFB        | 6 ms |
| Download    | 14 ms |
| DOM parse   | 4 ms |
| DOM ready   | 25 ms |
| Load        | 47 ms |
| **Total**   | **47 ms** |

## Navigation Timing API (representative navigation)

Derived from `performance.getEntriesByType('navigation')[0]`:

| Metric            | Value   | Notes |
|-------------------|---------|--------|
| TTFB              | ~6.8 ms | `responseStart - requestStart` |
| FCP               | ~48 ms  | `first-contentful-paint` entry `startTime` |
| LCP               | n/a     | No LCP entries in buffer this run |
| DOM interactive   | ~26 ms  | |
| DOM complete      | ~45 ms  | |
| Full load         | ~45 ms  | `loadEventEnd` |
| Encoded body      | 6762 B  | |
| Decoded body      | 28990 B | |
| Delivery          | cache   | |
| Protocol          | h2      | |

## Network summary (`resource` entries)

| Metric            | Value |
|-------------------|-------|
| Total requests    | 37 |
| Total transfer\*  | 3300 B |

\*Sum of `transferSize`; many entries reported `0` (typical with cache or headless). Treat as indicative, not a full wire-weight audit.

**Requests by initiator type:** script 13, fetch 11, img 7, link 5, css 1.

## Slowest resources (by duration)

Top durations were **fetch** calls (e.g. `events`, `sponsors`, `publications`, `contact` in the **18–21 ms** range in this run). Most scripts/CSS showed **0 ms** duration here (likely cache or coalesced timing).

## Performance budget (industry defaults, for context)

| Check        | Budget   | Observed | Status |
|-------------|----------|----------|--------|
| FCP         | < 1.8 s  | ~48 ms   | PASS |
| LCP         | < 2.5 s  | n/a      | SKIP |
| HTTP/2      | —        | h2       | OK |

## Recommendations

1. **Capture LCP** with Lighthouse (mobile + desktop) or RUM; do not rely on headless LCP buffer alone.
2. **Establish a baseline** on this repo with `/benchmark https://www.ceusunsw.com/ --baseline` before large changes, then compare.
3. **Verify API `fetch` timings** (`events`, `sponsors`, etc.) under throttled 4G if those calls are on the critical path for first paint.

## Raw artifacts

- JSON: `.gstack/benchmark-reports/2026-05-05-benchmark.json`
