import { createContext, useState, useContext, useMemo } from 'react';
import useStorage from '../hooks/useStorage';
import PropTypes from 'prop-types';
import { validateForm } from '../helpers/validateForm';
import { initialColumns, initialTasks } from '../db/data';
import { ErrorContext } from './ErrorContext';

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
	const [columns] = useStorage('columns', initialColumns);
	const [tasks, setTasks] = useStorage('tasks', initialTasks);
	const users = Array.from(new Set(tasks.map(task => task.user)));
	const [selectedUser, setSelectedUser] = useState('');
	const { openErrorModal } = useContext(ErrorContext);
	const addTask = (userName, taskName) => {
		const validationErrors = validateForm(userName, taskName);
		if (validationErrors) {
			openErrorModal(validationErrors);
			return;
		}
		const newTask = {
			id: Date.now(),
			name: taskName,
			idColumn: 1,
			user: userName,
		};
		const taskInFirstColumn = tasks.filter(task => {
			return task.idColumn === columns[0].id;
		});
		if (taskInFirstColumn.length < columns[0].limit) {
			setTasks(prevTasks => [...prevTasks, newTask]);
		} else {
			openErrorModal('Task limit reached');
		}
	};
	const deleteTask = taskId => {
		setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
	};
	const editTask = (taskId, newTaskName, newAssignedUser) => {
		setTasks(prevTasks => {
			return prevTasks.map(task => {
				if (task.id === taskId) {
					return {
						...task,
						name: newTaskName,
						user: newAssignedUser || task.user,
					};
				}
				return task;
			});
		});
	};

	const tasksInColumn = useMemo(() => {
		return tasks.reduce((acc, task) => {
			acc[task.idColumn] = (acc[task.idColumn] || 0) + 1;
			return acc;
		}, {});
	}, [tasks]);
	const moveTaskForward = taskId => {
		setTasks(prevTasks => {
			return prevTasks.map(task => {
				if (task.id === taskId) {
					const currentColumnIndex = columns.findIndex(column => column.id === task.idColumn);
					if (currentColumnIndex >= 0 && currentColumnIndex < columns.length - 1) {
						const nextColumn = columns[currentColumnIndex + 1];
						const tasksInNextColumn = tasksInColumn[nextColumn.id] || 0;
						if (tasksInNextColumn < nextColumn.limit) {
							return { ...task, idColumn: nextColumn.id };
						} else {
							setTimeout(() => openErrorModal('Too many tasks in the next column!'), 0);
							return task;
						}
					} else {
						setTimeout(() => openErrorModal('Cannot move forward from this column!'), 0);
						return task;
					}
				}
				return task;
			});
		});
	};

	const moveTaskBackward = taskId => {
		setTasks(prevTasks => {
			return prevTasks.map(task => {
				if (task.id === taskId) {
					const currentColumnIndex = columns.findIndex(column => column.id === task.idColumn);
					if (currentColumnIndex > 0) {
						const prevColumn = columns[currentColumnIndex - 1];
						const tasksInPrevColumn = tasksInColumn[prevColumn.id] || 0;

						if (tasksInPrevColumn < prevColumn.limit) {
							return { ...task, idColumn: prevColumn.id };
						} else {
							setTimeout(() => openErrorModal('Too many tasks in the previous column!'), 0);
							return task;
						}
					} else {
						setTimeout(() => openErrorModal('Cannot move backward from this column!'), 0);
						return task;
					}
				}
				return task;
			});
		});
	};

	return (
		<KanbanContext.Provider
			value={{
				tasks: tasks.filter(task => (selectedUser ? task.user === selectedUser : true)),
				columns,
				users,
				selectedUser,
				setSelectedUser,
				addTask,
				deleteTask,
				editTask,
				moveTaskForward,
				moveTaskBackward,
			}}
		>
			{children}
		</KanbanContext.Provider>
	);
};
KanbanProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
