import { AD_PACING } from '../config/admobConfig';

export interface InterstitialPacingState {
  detailOpensSinceLastAd: number;
  lastShownAtMs: number | null;
}

export const INITIAL_PACING_STATE: InterstitialPacingState = {
  detailOpensSinceLastAd: 0,
  lastShownAtMs: null,
};

/**
 * Evaluates whether a newly opened Cheat Details screen should display a
 * preloaded interstitial ad based on count threshold + cooldown window.
 */
export function evaluateDetailOpen(
  state: InterstitialPacingState,
  nowMs: number,
  config: {
    everyNOpens?: number;
    cooldownMs?: number;
  } = {}
): {
  shouldShow: boolean;
  nextState: InterstitialPacingState;
} {
  const everyNOpens = config.everyNOpens ?? AD_PACING.interstitialEveryNOpens;
  const cooldownMs = config.cooldownMs ?? AD_PACING.interstitialCooldownMs;

  const nextOpens = state.detailOpensSinceLastAd + 1;
  const cooldownElapsed =
    state.lastShownAtMs === null || nowMs - state.lastShownAtMs >= cooldownMs;

  if (nextOpens >= everyNOpens && cooldownElapsed) {
    return {
      shouldShow: true,
      nextState: {
        detailOpensSinceLastAd: 0,
        lastShownAtMs: nowMs,
      },
    };
  }

  return {
    shouldShow: false,
    nextState: {
      detailOpensSinceLastAd: nextOpens,
      lastShownAtMs: state.lastShownAtMs,
    },
  };
}
