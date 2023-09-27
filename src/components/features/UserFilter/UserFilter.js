import PropTypes from 'prop-types';
import Select from '../../ui/Select/Select';
const UserFilter = ({ users, selectedUser, onSelectUser }) => {
	return (
		<div>
			<label htmlFor={'userFilter'}>Filter by User:</label>
			<Select id={'userFilter'} value={selectedUser} onChange={e => onSelectUser(e.target.value)}>
				<option value={''}>All Users</option>
				{users.map(user => (
					<option key={user} value={user}>
						{user}
					</option>
				))}
			</Select>
		</div>
	);
};
UserFilter.propTypes = {
	users: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedUser: PropTypes.string.isRequired,
	onSelectUser: PropTypes.func.isRequired,
};
export default UserFilter;
