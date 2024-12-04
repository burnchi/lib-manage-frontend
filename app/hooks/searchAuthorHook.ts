import { create } from "zustand";

interface State {
  authorVal: string;
}

type Action = {
  setauthorVal: (authorVal: string) => void;
};

export const searchAuthorHook = create<State & Action>()((set) => ({
  authorVal: "",
  setauthorVal: (item) => set(() => ({ authorVal: item })),
}));
