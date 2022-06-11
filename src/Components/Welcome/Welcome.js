import './welcome.scss';
import { useContext, useEffect } from 'react';
import { HomePageContext } from '../../Pages/Home/HomePage';

function Welcome() {
	const { wlc, charHandler, quote, resetSecretWord, secretProgress, language } =
		useContext(HomePageContext);

	useEffect(() => {
		// getMemes();
	}, []);

	// async function getMemes() {
	// 	const jsonData = await fetch('https://meme-api.herokuapp.com/gimme/cute');
	// 	// const jsonData = await fetch('https://api.imgflip.com/get_memes');
	// 	const response = await jsonData.json();

	// 	console.log({ img: response.url });

	// 	// const { memes } = response.data;
	// 	// const randMeme = memes[Math.floor(Math.random() * memes.length)];
	// 	// console.log(randMeme.url);
	// }

	return (
		<div className='welcome_wrap table_wrap'>
			<div className='welcome_section'>
				<WelcomeSecretWord />
				<p className='welcome_title'>
					<span>{language === 'en' ? 'to' : 'до'} </span>
					<span
						className={`${secretProgress === 3 ? 'title_reset' : ''}`}
						onClick={resetSecretWord}>
						{language === 'en' ? 'MemeDraw' : 'МалюйМеми'}
					</span>{' '}
					<span>🇺🇦</span>
				</p>
				<div className='quote_section'>
					<p className='quote_text'>{quote.content}</p>
					<p className='quote_author'>&copy; {quote.author}</p>
				</div>
			</div>
			{/* <div className='weolcome_meme_image'>
				<img src='' alt='random meme' />
			</div> */}
		</div>
	);

	function WelcomeSecretWord() {
		return (
			<div className='welcome_word'>
				{wlc.map((char, index) => {
					return (
						<span
							id={Array.isArray(char) ? 'welcome_word_wait' : ''}
							className={Array.isArray(char) ? 'secret' : ''}
							onClick={charHandler}
							value={char}
							key={index}>
							{char[0]}
						</span>
					);
				})}
			</div>
		);
	}
}

export default Welcome;
