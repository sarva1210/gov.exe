import { create } from "zustand"

const useChaosStore = create((set) => ({
  rageLevel: 0,
  notifications: [],
  virusThreatCount: 69,

  increaseRage: () =>
    set((state) => ({
      rageLevel: Math.min(state.rageLevel + 10, 100),
    })),

  incrementRage: (amount = 10) =>
    set((state) => ({
      rageLevel: Math.min(state.rageLevel + amount, 100),
    })),

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