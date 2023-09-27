import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({
	type = 'text',
	name,
	value,
	onChange,
	placeholder,
	variant,
	onSubmit,
	...otherProps
}) => {
	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			onSubmit && onSubmit(e.target.value);
		}
	};
	return (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			onKeyDown={handleKeyDown}
			className={`${styles.base} ${variant ? styles[`base--${variant}`] : ''}`}
			{...otherProps}
		/>
	);
};

Input.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	variant: PropTypes.string,
	onSubmit: PropTypes.func,
};
export default Input;
