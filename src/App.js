import { useState, useEffect } from 'react';
import './styles/App.scss';
import { KanbanProvider } from './contexts/KanbanContext';
import Header from './components/layout/Header/Header';
import Main from './components/layout/Main/Main';
import Footer from './components/layout/Footer/Footer';
import GradientPicker from './components/features/GradientPicker/GradientPicker';
import { ErrorProvider } from './contexts/ErrorContext';

function App() {
	const [color1, setColor1] = useState('#8360c3');
	const [color2, setColor2] = useState('#2ebf91');
	useEffect(() => {
		document.body.style.backgroundImage = `linear-gradient(to right, ${color1}, ${color2})`;
		return () => {
			document.body.style.backgroundImage = '';
		};
	}, [color1, color2]);

	return (
		<ErrorProvider>
			<KanbanProvider>
				<div className={'App'}>
					<GradientPicker
						color1={color1}
						setColor1={setColor1}
						color2={color2}
						setColor2={setColor2}
					/>
					<Header />
					<Main />
					<Footer />
				</div>
			</KanbanProvider>
		</ErrorProvider>
	);
}

export default App;
