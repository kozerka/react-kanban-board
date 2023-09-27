import { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { KanbanContext } from '../../../contexts/KanbanContext';
import { ErrorContext } from '../../../contexts/ErrorContext';
import Button from '../../ui/Button/Button';
import Modal from '../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleLeft,
	faPenToSquare,
	faTrash,
	faCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import Select from '../../ui/Select/Select';
import Input from '../../ui/Input/Input';
import styles from './Task.module.scss';
import { validateEditTask } from '../../../helpers/validateForm';

const Task = ({ task }) => {
	const { users, deleteTask, editTask, moveTaskForward, moveTaskBackward } =
		useContext(KanbanContext);
	const { openErrorModal } = useContext(ErrorContext);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const [modalTitle, setModalTitle] = useState('');
	const [isDropdownVisible, setDropdownVisibility] = useState(false);
	const editedTaskNameRef = useRef(task.name);
	const toggleUserDropdown = () => {
		setDropdownVisibility(!isDropdownVisible);
	};
	const assignToUser = e => {
		const userId = e.target.value;
		editTask(task.id, task.name, userId);
		setDropdownVisibility(false);
	};

	const handleConfirmDelete = () => {
		deleteTask(task.id);
		setShowModal(false);
	};
	const handleDelete = () => {
		setModalTitle('Delete Task');
		setModalContent(
			<div className={styles.box}>
				<p>Are you sure you want to delete this task?</p>
				<Button variant={'modal-submit'} onClick={handleConfirmDelete}>
					Yes
				</Button>
			</div>
		);
		setShowModal(true);
	};

	const handleEdit = () => {
		setModalTitle('Edit Task');
		setModalContent(
			<div>
				<Input
					variant={'edit'}
					type={'text'}
					defaultValue={editedTaskNameRef.current}
					onChange={e => (editedTaskNameRef.current = e.target.value)}
					placeholder={'Enter new task name'}
					onKeyUp={e => {
						if (e.keyCode === 13) {
							handleSaveChanges();
						}
					}}
				/>
				<div style={{ marginTop: '20px' }}>
					<Button variant={'modal-submit'} onClick={handleSaveChanges}>
						Confirm
					</Button>
					<Button variant={'modal-submit'} onClick={() => setShowModal(false)}>
						Cancel
					</Button>
				</div>
			</div>
		);

		setShowModal(true);
	};
	const handleSaveChanges = () => {
		const errors = validateEditTask(editedTaskNameRef.current);
		if (errors) {
			openErrorModal(<div className={styles.error}>{errors}</div>);
		} else {
			editTask(task.id, editedTaskNameRef.current);
			setShowModal(false);
		}
	};

	const handleMoveForward = () => {
		moveTaskForward(task.id);
	};
	const handleMoveBackward = () => {
		moveTaskBackward(task.id);
	};
	const assignedUser = task.user;
	return (
		<div className={styles.container}>
			<h4 className={styles.header}>{task.name}</h4>
			<p className={styles.user}>Assigned to: {assignedUser || 'Unassigned'}</p>
			<Button onClick={handleMoveBackward}>
				<FontAwesomeIcon icon={faCircleLeft} />
			</Button>
			<Button onClick={handleEdit} variant={'edit'}>
				<FontAwesomeIcon icon={faPenToSquare} />
			</Button>
			<Button onClick={handleDelete} variant={'delete'}>
				<FontAwesomeIcon icon={faTrash} />
			</Button>
			<Button onClick={handleMoveForward}>
				<FontAwesomeIcon icon={faCircleRight} />
			</Button>
			{isDropdownVisible && (
				<Select onChange={assignToUser} value={task.user} variant={'small'}>
					{users.map(user => (
						<option key={user} value={user}>
							{user}
						</option>
					))}
				</Select>
			)}
			<Button variant={'changeUser'} onClick={toggleUserDropdown}>
				Assign to another user
			</Button>

			<Modal
				variant={'edit'}
				show={showModal}
				title={modalTitle}
				content={modalContent}
				onClose={() => setShowModal(false)}
			/>
		</div>
	);
};

Task.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		name: PropTypes.string.isRequired,
		user: PropTypes.string.isRequired,
	}).isRequired,
};
export default Task;
