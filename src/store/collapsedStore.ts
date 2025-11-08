import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  collapsed: boolean;
};

type Actions = {
  change: () => void;
};
const initialState = {
  collapsed: false,
};

export const useCollapsedStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      change: () =>
        set((state) => {
          return {
            ...state,
            collapsed: !state.collapsed,
          };
        }),
    }),
    {
      name: "SPEAKER_CENTER_COLLAPSED",
    }
  )
);
