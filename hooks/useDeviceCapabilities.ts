'use client';

import { useSyncExternalStore } from 'react';

type DeviceTier = 'low' | 'mid' | 'high';

interface DeviceCapabilities {
  tier: DeviceTier;
  isMobile: boolean;
  isLowEnd: boolean;
  slowConnection: boolean;
  reducedMotion: boolean;
}

const invalidate = () => {
  cachedCapabilities = null;
  cachedTime = 0;
  snapshotRef = getCapabilities();
};

const subscribe = (onChange: () => void) => {
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', invalidate);
  const nav = navigator as Navigator & { connection?: { addEventListener?: any; removeEventListener?: any } };
  if (nav.connection) {
    nav.connection.addEventListener('change', invalidate);
  }
  return () => {
    window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', invalidate);
    if (nav.connection) {
      nav.connection.removeEventListener('change', invalidate);
    }
  };
};

const detectTier = (): DeviceTier => {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;
  const isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
  const conn = (navigator as any).connection as { effectiveType?: string; saveData?: boolean } | undefined;
  const slowConn = conn?.effectiveType === 'slow-2g' ||
    conn?.effectiveType === '2g' ||
    conn?.saveData === true;

  if (isMobile) {
    return 'low';
  }

  if (cores <= 2) return 'low';
  if (cores <= 4 && memory <= 4) return 'mid';
  return 'high';
};

let cachedCapabilities: DeviceCapabilities | null = null;
let cachedTime = 0;
const CACHE_TTL = 5000;

const getCapabilities = (): DeviceCapabilities => {
  const now = Date.now();
  if (cachedCapabilities && now - cachedTime < CACHE_TTL) return cachedCapabilities;

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
  const tier = detectTier();
  const slowConnection = tier === 'low';

  cachedCapabilities = {
    tier,
    isMobile,
    isLowEnd: tier === 'low',
    slowConnection,
    reducedMotion: mq.matches,
  };
  cachedTime = now;
  return cachedCapabilities;
};

// Stable snapshot reference for useSyncExternalStore
// Lazily initialized to avoid accessing window during SSR
let snapshotRef: DeviceCapabilities | null = null;

const getSnapshot = (): DeviceCapabilities => {
  if (!snapshotRef) {
    snapshotRef = getCapabilities();
  }
  return snapshotRef;
};

// Cached SSR fallback — must return same reference to avoid infinite loop
const DEFAULT_CAPABILITIES: DeviceCapabilities = {
  tier: 'mid',
  isMobile: true,
  isLowEnd: true,
  slowConnection: true,
  reducedMotion: true,
};

export function useDeviceCapabilities(): DeviceCapabilities {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => DEFAULT_CAPABILITIES
  );
}

export function useShouldReduceMotion(capabilities: DeviceCapabilities): boolean {
  return capabilities.reducedMotion || capabilities.isLowEnd;
}
