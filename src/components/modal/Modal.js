// react
import { useRef } from "react";

// prop-types
import { node, func } from "prop-types";

// styled components
import styled from "styled-components";

const Mask = styled.div`
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(20, 20, 20, 0.5);
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
`;

const Modal = styled.div`
  max-width: 300px;
  background: white;
  border-radius: 4px;
  padding: 16px;
`;

/**
 * @name ModalComponent
 * @description method to create the modal component
 * @param {*} isOpen
 * @returns modal component
 */
const ModalComponent = ({ children, handleClick }) => {
  const modalRef = useRef(null);

  const handleModalMaskClick = (e) => {
    if (modalRef.current && !(modalRef.current.contains(e.target))) {
      handleClick(false);
    }
  };

  return (
    <Mask className="modal" onClick={(e) => handleModalMaskClick(e)}>
      <Modal ref={modalRef}>{children}</Modal>
    </Mask>
  );
};

ModalComponent.propTypes = {
  children: node.isRequired,
  handleClick: func.isRequired,
};

export default ModalComponent;
