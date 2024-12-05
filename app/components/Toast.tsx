"use client";
import useToastHook from "@/app/hooks/useToastHook";
import { cn } from "@/app/lib/util";
import { useEffect } from "react";

const Toast = () => {
  const { isToastOpen, onCloseToast, toastObj } = useToastHook();
  const { message, Icon, className } = toastObj;

  useEffect(() => {
    if (isToastOpen === true) return;
    // console.log("call");
    setTimeout(() => {
      onCloseToast();
    }, 3000);
  });

  return (
    // animate-toastmove
    <>
      {isToastOpen && (
        <div
          className={cn(
            "fixed animate-toastmove -top-[60px] right-1/2 z-[60]",
            className,
          )}
        >
          <div className="px-4 py-3 flex items-center gap-2 bg-white rounded-md">
            <Icon size={16} className="bg-white text-green-500 rounded-full" />
            <span className="text-sm text-neutral-600">{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
