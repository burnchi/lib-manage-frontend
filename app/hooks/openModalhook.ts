// import getPostMetaData from "@/lib/posts";
import { create } from "zustand";

// const postsjson = getPostMetaData("posts");
interface openModalhookStore {
  isOpen: boolean;
  whichModal: string;
  postContent: string;
  title: string;
  // allPosts: any;
  onOpen: () => void;
  onClose: () => void;
  setwhichModal: (item: string) => void;
  setModalTitle: (item: string) => void;
  setpostContent: (item: string) => void;
}
const openModalhook = create<openModalhookStore>((set) => ({
  isOpen: false,
  whichModal: "",
  title: "",
  postContent: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setwhichModal: (item) => set({ whichModal: item }),
  setModalTitle: (item) => set({ title: item }),
  setpostContent: (item) => set({ postContent: item }),
}));
export default openModalhook;
