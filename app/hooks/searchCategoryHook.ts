import { create } from "zustand";

interface State {
  categoryVal: string;
}

type Action = {
  setcategoryVal: (categoryVal: string) => void;
};

export const searchCategoryHook = create<State & Action>()((set) => ({
  categoryVal: "",
  setcategoryVal: (item) => set(() => ({ categoryVal: item })),
}));
