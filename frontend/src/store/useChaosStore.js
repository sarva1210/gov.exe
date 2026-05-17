import { create } from "zustand"

const useChaosStore = create((set) => ({
  rageLevel: 0,
  notifications: [],
  virusThreatCount: 69,

  // Original action — preserved exactly
  increaseRage: () =>
    set((state) => ({
      rageLevel: Math.min(state.rageLevel + 10, 100),
    })),

  // NEW: alias expected by spec §4.5 — increments by a custom amount (default 10)
  incrementRage: (amount = 10) =>
    set((state) => ({
      rageLevel: Math.min(state.rageLevel + amount, 100),
    })),

  // NEW: Virus Scanner threat multiplication (Desktop §3.3-A)
  increaseThreats: () =>
    set((state) => ({
      virusThreatCount:
        state.virusThreatCount + Math.floor(Math.random() * 13) + 3,
    })),

  addNotification: (message) =>
    set((state) => ({
      notifications: [...state.notifications, message],
    })),

  clearNotifications: () =>
    set({
      notifications: [],
    }),
}))

export default useChaosStore