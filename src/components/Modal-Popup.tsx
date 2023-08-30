/** @jsxImportSource theme-ui */
import React, { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "../contexts/modalContext";
import { ModalContextType } from "../../types/interfaces";
import ReactDOM from "react-dom";

const Modal = ({ title }: { title: string }) => {
  const { handleModal, isOpen, modalContent } = React.useContext(ModalContext);

  const modal = (
    <div sx={{ variant: "components.popup" }}>
      <div sx={{ alignSelf: "flex-end", size: "15px", margin: "10px 15px" }}>
        <FontAwesomeIcon
          icon={faXmark as IconProp}
          onClick={() => handleModal(null, "")}
        />
      </div>
      <h3 sx={{ alignSelf: "center", padding: "10px" }}>{title}</h3>
      <div sx={{ alignSelf: "center" }}>{modalContent}</div>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
