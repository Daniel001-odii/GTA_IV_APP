import {
  evaluateDetailOpen,
  INITIAL_PACING_STATE,
  InterstitialPacingState,
} from '../interstitialPacing';

describe('interstitialPacing', () => {
  it('does not trigger on opens 1-4 and triggers on open 5', () => {
    let state = INITIAL_PACING_STATE;
    const t0 = 1_000_000;

    for (let open = 1; open <= 4; open++) {
      const res = evaluateDetailOpen(state, t0 + open * 1_000);
      expect(res.shouldShow).toBe(false);
      state = res.nextState;
    }

    const fifth = evaluateDetailOpen(state, t0 + 5_000);
    expect(fifth.shouldShow).toBe(true);
    expect(fifth.nextState.detailOpensSinceLastAd).toBe(0);
    expect(fifth.nextState.lastShownAtMs).toBe(t0 + 5_000);
  });

  it('enforces the 2-minute cooldown even if 5 more details are opened immediately', () => {
    let state: InterstitialPacingState = {
      detailOpensSinceLastAd: 0,
      lastShownAtMs: 1_000_000,
    };

    // 5 rapid opens within 30 seconds of last ad -> must NOT show
    for (let i = 1; i <= 5; i++) {
      const res = evaluateDetailOpen(state, 1_000_000 + i * 5_000);
      expect(res.shouldShow).toBe(false);
      state = res.nextState;
    }

    // Once 2 minutes (120,000ms) have elapsed, the next open triggers
    const afterCooldown = evaluateDetailOpen(state, 1_000_000 + 120_000);
    expect(afterCooldown.shouldShow).toBe(true);
    expect(afterCooldown.nextState.detailOpensSinceLastAd).toBe(0);
  });
});
