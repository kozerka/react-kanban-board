import { useState, useContext } from 'react';
import { KanbanContext } from '../../../contexts/KanbanContext';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import Label from '../../ui/Label/Label';

const TaskForm = () => {
	const [taskName, setTaskName] = useState('');
	const [userName, setUserName] = useState('');
	const { addTask } = useContext(KanbanContext);

	const handleSubmit = e => {
		e.preventDefault();

		addTask(userName, taskName);
		setTaskName('');
		setUserName('');
	};

	return (
		<form
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				marginTop: '3rem',
				width: '100%',
			}}
			onSubmit={handleSubmit}
		>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '3rem' }}>
				<div>
					<Label>
						User Name:
						<Input
							placeholder={'User Name'}
							variant={'submit'}
							type={'text'}
							value={userName}
							onChange={e => setUserName(e.target.value)}
						/>
					</Label>
				</div>
				<div>
					<Label>
						Task
						<Input
							placeholder={'Task to assign'}
							type={'text'}
							value={taskName}
							variant={'submit'}
							onChange={e => setTaskName(e.target.value)}
						/>
					</Label>
				</div>
			</div>
			<Button variant={'submit'} type={'submit'}>
				Add Task
			</Button>
		</form>
	);
};

export default TaskForm;
