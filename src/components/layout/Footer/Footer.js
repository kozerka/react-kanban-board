import TaskForm from '../../features/TaskForm/TaskForm';
import styles from './Footer.module.scss';
const Footer = () => {
	return (
		<footer className={styles.footer}>
			<TaskForm />
		</footer>
	);
};
export default Footer;
