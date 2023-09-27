import { useContext } from 'react';
import { KanbanContext } from '../../../contexts/KanbanContext';
import UserFilter from '../../features/UserFilter/UserFilter';
import styles from './Header.module.scss';
const Header = () => {
	const { users, selectedUser, setSelectedUser } = useContext(KanbanContext);
	return (
		<header>
			<h1 className={styles.title}>Kanban Board</h1>
			<UserFilter users={users} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
		</header>
	);
};
export default Header;
