import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import React from 'react';
import useWindowWidth from '@/helpers/windowsSize';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const ModalBurgerMenu: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [isBrowser, setIsBrowser] = useState(false);
	const withWindow = useWindowWidth();

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (modalRef?.current && !modalRef?.current?.contains(event.target as Node)) {
			onClose();
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && isOpen ) {
			onClose();
		}
	};

	useEffect(() => {
		if (withWindow !== undefined && withWindow > 1160 && isOpen) {
			onClose();
		}
	}, [withWindow, isOpen, onClose]); 

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		} else {
			document.removeEventListener('keydown', handleKeyDown);
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	const modalContent = isOpen ? (
		<div className="modal-overlay-burger relative" onClick={handleOverlayClick}>
			<div className="modal-burger" ref={modalRef}>
				{children}
			</div>
		</div>
	) : null;

	if (isBrowser) {
		return createPortal(modalContent, document.body);
	} else {
		return null;
	};
};

export default ModalBurgerMenu;
