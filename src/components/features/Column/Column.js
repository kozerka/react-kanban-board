import { useContext } from 'react';
import { KanbanContext } from '../../../contexts/KanbanContext';
import Task from '../Task/Task';
import styles from './Column.module.scss';

import PropTypes from 'prop-types';

const Column = ({ columnData }) => {
	const { tasks } = useContext(KanbanContext);
	const columnTask = tasks.filter(task => task.idColumn === columnData.id);
	return (
		<div>
			<h2 className={styles['column-header']}>
				{columnData.name}({columnTask.length}/{columnData.limit})
			</h2>
			<div className={styles.column}>
				{columnTask.map(task => (
					<Task key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};
Column.propTypes = {
	columnData: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		limit: PropTypes.number,
	}).isRequired,
};

export default Column;
