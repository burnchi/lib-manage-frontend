import { create } from "zustand";

type CardProps = {
  id: number;
  title: string;
};

interface State {
  selectedCardList: CardProps[];
}

type Action = {
  setselectedCardList: (selectedCardList: CardProps[]) => void;
};

export const selectCardHook = create<State & Action>()((set) => ({
  selectedCardList: [],
  setselectedCardList: (item) => set(() => ({ selectedCardList: item })),
}));
