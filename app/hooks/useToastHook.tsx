// import getPostMetaData from "@/lib/posts";
import { IconType } from "react-icons";
import { create } from "zustand";

type ToastType = {
  message?: string;
  Icon?: IconType;
  className?: string;
};
// const postsjson = getPostMetaData("posts");
interface toasthookStore {
  isToastOpen: boolean;
  onOpenToast: () => void;
  onCloseToast: () => void;
  toastObj: ToastType;
  setToastObj: (obj: ToastType) => void;
}
const useToastHook = create<toasthookStore>((set) => ({
  isToastOpen: false,
  toastObj: {},
  onOpenToast: () => set({ isToastOpen: true }),
  onCloseToast: () => set({ isToastOpen: false }),
  setToastObj: (obj) => set({ toastObj: obj }),
}));
export default useToastHook;
