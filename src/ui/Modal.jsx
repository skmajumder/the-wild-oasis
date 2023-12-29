import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// * Create contetx
const ModalContext = createContext();

// * Parent component
const Modal = ({ children }) => {
  const [activeWindow, setActiveWindow] = useState("");

  const handleClose = () => setActiveWindow("");
  const handleOpen = setActiveWindow;

  return (
    <ModalContext.Provider value={{ handleClose, handleOpen, activeWindow }}>
      {children}
    </ModalContext.Provider>
  );
};

// * Children
const Open = ({ children, opens: opensWindowName }) => {
  const { handleOpen } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => handleOpen(opensWindowName) });
};

// * Children
const Window = ({ children, name }) => {
  const { activeWindow, handleClose } = useContext(ModalContext);
  const { ref } = useOutsideClick(handleClose);

  if (name !== activeWindow) return null;

  return createPortal(
    <Overlay>
      <StyledModal aria-modal="true" ref={ref}>
        <Button onClick={handleClose}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: handleClose })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
