import openModalhook from "@/app/hooks/openModalhook";
import { useRef } from "react";

const ModalProvider = ({ children }) => {
  const { onClose, isOpen, whichModal } = openModalhook();
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const handleClose = (e: any) => {
    if (e.target === modalRef.current && e.target !== contentRef.current) {
      // console.log("close");
      onClose();
    }
  };
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-neutral-800/70 dark:bg-black/40 z-50"
            ref={modalRef}
            onClick={handleClose}
          />
          <div ref={contentRef}>{children}</div>
        </>
      )}
    </>
  );
};

export default ModalProvider;
