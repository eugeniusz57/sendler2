import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSelectOpen?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, isSelectOpen, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef?.current && !modalRef?.current?.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !isSelectOpen) {
      onClose();
    }
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        onClose();
        window.history.pushState(null, '', window.location.href);
      }
    };

    if (isOpen) {
      window.history.pushState(null, '', window.location.href);

      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, isSelectOpen]);

  const modalContent = isOpen ? (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal relative" ref={modalRef}>
        {children}
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return createPortal(modalContent, document.body);
  }

  return null;
};

export default Modal;
