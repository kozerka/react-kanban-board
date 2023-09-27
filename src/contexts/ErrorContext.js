import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../components/features/Modal/Modal';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [errorModalContent, setErrorModalContent] = useState('');

	const openErrorModal = content => {
		setErrorModalContent(content);
		setErrorModalVisible(true);
	};

	const closeErrorModal = () => {
		setErrorModalVisible(false);
		setErrorModalContent('');
	};

	return (
		<ErrorContext.Provider
			value={{
				errorModalVisible,
				errorModalContent,
				openErrorModal,
				closeErrorModal,
			}}
		>
			{children}
			<Modal
				show={errorModalVisible}
				title={'Error'}
				onClose={closeErrorModal}
				content={errorModalContent}
			/>
		</ErrorContext.Provider>
	);
};

ErrorProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
