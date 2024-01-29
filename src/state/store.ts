import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useParkingStore = create(
  persist(
    (set) => ({
      initialRates: {
        firstHour: 50,
        secondHour: 40,
        followingHours: 25,
      },
      availableSpots: [
        {
          Hc: 0,
          Family: 0,
          Ev: 0,
          Normal: 0,
        },
        {
          Hc: 4,
          Family: 0,
          Ev: 2,
          Normal: 15,
        },
        {
          Hc: 3,
          Family: 6,
          Ev: 1,
          Normal: 0,
        },
      ],
      initialCapacity: {
        Normal: 50,
        Hc: 3,
        Ev: 10,
        Family: 5,
      },
      parkedCar: {
        timeStart: null,
        timeEnd: null,
        currentPrice: null,
      },

      increment: () => {
        set((state: { count: number }) => ({ count: state.count + 1 }));
      },
      decrement: () => {
        set((state: { count: number }) => ({ count: state.count - 1 }));
      },
      setString: (textProp: string) => {
        set((state: { string: string }) => ({
          string: state.string + textProp,
        }));
      },
    }),
    {
      name: "park-persist",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
