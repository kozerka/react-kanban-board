import PropTypes from 'prop-types';
import styles from './GradientPicker.module.scss';

function GradientPicker({ color1, setColor1, color2, setColor2 }) {
	const handleColor1Change = e => {
		setColor1(e.target.value);
	};

	const handleColor2Change = e => {
		setColor2(e.target.value);
	};

	return (
		<div className={styles.container}>
			<input
				className={styles['picker-input']}
				type={'color'}
				value={color1}
				onChange={handleColor1Change}
			/>
			<input
				className={styles['picker-input']}
				type={'color'}
				value={color2}
				onChange={handleColor2Change}
			/>
		</div>
	);
}
GradientPicker.propTypes = {
	color1: PropTypes.string.isRequired,
	setColor1: PropTypes.func.isRequired,
	color2: PropTypes.string.isRequired,
	setColor2: PropTypes.func.isRequired,
};
export default GradientPicker;
