import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { handleTabFocus } from '../../../helpers/handleTabfocus';
import styles from './Modal.module.scss';
import Button from '../../ui/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ show, title, content, actions, onClose, variant }) => {
	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};
	const modalRef = useRef(null);
	const buttonRef = useRef(null);

	useEffect(() => {
		if (show) {
			const wrappedHandleTab = e => handleTabFocus(e, modalRef);

			document.addEventListener('keydown', wrappedHandleTab);
			return () => {
				document.removeEventListener('keydown', wrappedHandleTab);
			};
		}
	}, [show]);
	useEffect(() => {
		if (show) {
			buttonRef.current.focus();
		}
	}, [show]);

	if (!show) return null;

	return ReactDOM.createPortal(
		<div ref={modalRef} onClick={handleOverlayClick} className={styles.overlay}>
			<div className={`${styles.content} ${variant ? styles[`content--${variant}`] : ''}`}>
				<h2>{title}</h2>
				{content}
				<div className={styles.actions}>
					{actions}
					<Button ref={buttonRef} onClick={onClose} variant={'closeModal'}>
						<FontAwesomeIcon icon={faCircleXmark} />
					</Button>
				</div>
			</div>
		</div>,
		document.getElementById('modal-root')
	);
};

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	title: PropTypes.string,
	content: PropTypes.node,
	actions: PropTypes.node,
	onClose: PropTypes.func.isRequired,
	variant: PropTypes.string,
};
Modal.defaultProps = {
	title: '',
	content: null,
	actions: null,
};
export default Modal;
