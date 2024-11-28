import { create } from "zustand";

interface State {
  dropdownVisible: boolean;
}

type Action = {
  setDropdownVisible: (visible: boolean) => void;
};

export const createBookHook = create<State & Action>()((set) => ({
  dropdownVisible: false,
  setDropdownVisible: (item) => set(() => ({ dropdownVisible: item })),
}));
