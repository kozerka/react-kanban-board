import PropTypes from 'prop-types';
import styles from './Select.module.scss';

const Select = ({ value, onChange, variant, id, children }) => {
	return (
		<select
			className={`${styles.randomInput} ${variant ? styles[`randomInput--${variant}`] : ''}`}
			value={value}
			onChange={onChange}
			id={id}
		>
			{children}
		</select>
	);
};

Select.propTypes = {
	children: PropTypes.node.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	variant: PropTypes.string,
	id: PropTypes.string,
};

export default Select;
