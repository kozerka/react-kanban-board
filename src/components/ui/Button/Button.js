import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = forwardRef((props, ref) => {
	const { onClick, children, variant, ...otherProps } = props;
	return (
		<button
			onClick={onClick}
			{...otherProps}
			ref={ref}
			className={`${styles.randomButton} ${variant ? styles[`randomButton--${variant}`] : ''}`}
		>
			{children}
		</button>
	);
});
Button.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired,
	variant: PropTypes.string,
};
export default Button;
