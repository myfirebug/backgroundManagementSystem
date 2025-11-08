import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
};

type Actions = {
  setToken: (token: string) => void;
  clearToken: () => void;
};

const initialState = { token: "" };

export const useTokensStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setToken: (token) =>
        set((state) => {
          state.token = token;
          return state;
        }),
      clearToken: () =>
        set((state) => {
          state.token = "";
          return state;
        }),
    }),
    {
      name: "SPEAKER_CENTER_TOKEN",
    }
  )
);
