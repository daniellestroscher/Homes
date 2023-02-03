import React, { ReactNode, useContext, useState } from "react";
import Modal from "../components/Modal-Popup/Modal-Popup";
import { ModalContextType } from "../../types/interfaces";

export const ModalContext = React.createContext<ModalContextType>({
  isOpen: false,
  handleModal: () => {},
  modalContent: {} as ReactNode,
});

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context) return context;
  else throw new Error('useModalContext was used outside its provider');
}

export function ModalProvider({ children }:{children:ReactNode}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  let [modalContent, setModalContent] = React.useState<ReactNode>(
    "I'm the Modal Content"
  );

  const handleModal = (content: ReactNode, title:string) => {
    setIsOpen(!isOpen);
    setTitle(title);
    if (content) {
      setModalContent(content)
    }
  };

  return (
    <ModalContext.Provider value={{ isOpen, handleModal, modalContent, title}}>
      <Modal title={title}/>
      {children}
    </ModalContext.Provider>
  );
};