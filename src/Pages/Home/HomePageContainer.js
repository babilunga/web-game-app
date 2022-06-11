import './home-page.scss';
import Welcome from '../../Components/Welcome/Welcome';
import Lobby from '../../Components/Lobby/Lobby';
import Header from '../../Components/Header/Header';

function HomeContainer() {
	return (
		<div className='home_wrap'>
			<Header />
			<main className='home'>
				<Welcome />
				<Lobby />
			</main>
		</div>
	);
}

export default HomeContainer;
