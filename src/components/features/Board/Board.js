import { useContext } from 'react';
import { KanbanContext } from '../../../contexts/KanbanContext';
import Column from '../Column/Column';
import styles from './Board.module.scss';

const Board = () => {
	const { columns, tasks } = useContext(KanbanContext);
	return (
		<div className={styles.board}>
			{columns.map(column => (
				<Column
					key={column.id}
					columnData={column}
					tasks={tasks.filter(task => task.idColumn === column.id)}
				/>
			))}
		</div>
	);
};
export default Board;
