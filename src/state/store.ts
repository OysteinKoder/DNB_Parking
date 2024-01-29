import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useParkingStore = create(
  persist(
    (set) => ({
      count: 0,
      string: "hello",
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
