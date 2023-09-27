import PropTypes from 'prop-types';
const Label = ({ children, ...otherProps }) => {
	return <label>{children}</label>;
};
Label.propTypes = {
	children: PropTypes.node.isRequired,
};
export default Label;
