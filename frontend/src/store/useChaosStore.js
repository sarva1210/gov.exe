import { create } from "zustand"

const useChaosStore = create((set) => ({
  rageLevel:0,
  notifications:[],

  increaseRage:() =>
    set((state) => ({
      rageLevel: state.rageLevel + 10
    })),

  addNotification:(message) =>
    set((state) => ({
      notifications:[
        ...state.notifications,
        message
      ]
    })),

  clearNotifications:() =>
    set({
      notifications:[]
    })
}))

export default useChaosStore