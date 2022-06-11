/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import HomePageContainer from './HomePageContainer';
export const HomePageContext = React.createContext();

function HomePage() {
	const [quote, setQuote] = useState({});
	const [secretProgress, setSecretProgress] = useState(0);
	const [wlc, setWlc] = useState(['W', 'e', ['l', '-', 2], 'c', ['o', 'u', 4], 'm', ['e', '?', 6]]);
	const [language, setLanguage] = useState('en');
	// const [language, setLanguage] = useState('en');
	// const [currentMeme, setCurrentMeme] = useState('');
	// const memeSet = useRef([]);

	useEffect(() => {
		if (secretProgress === 3) {
			quoteGeneration();
		}
	}, [secretProgress]);

	useEffect(() => {
		// getMemes();
		quoteGeneration();
	}, []);

	async function quoteGeneration() {
		// lukePeavey/quotable random quotations API,
		// github repo: https://github.com/lukePeavey/quotable#list-quotes.
		const response = await fetch(
			'https://api.quotable.io/random?tags=romantic|love|friendship|friends&maxLength=70'
		);
		const quote = await response.json();
		setQuote(quote);
	}

	// async function getMemes() {
	// 	// https://meme-api.herokuapp.com/gimme
	// 	const response = await fetch('https://api.imgflip.com/get_memes');
	// 	const meme = await response.json();
	// 	// console.log(meme.data.memes);
	// 	memeSet.current = meme.data.memes;
	// }

	// async function memeGenerator() {
	// 	// const response = await fetch('https://meme-api.herokuapp.com/gimme/mem');
	// 	// const data = await response.json();
	// 	// setCurrentMeme(data);

	// 	setCurrentMeme(
	// 		memeSet.current[Math.floor(Math.random() * memeSet.current.length)]
	// 	);
	// }

	const charHandler = useCallback(event => {
		const valueDOM = event.target.attributes.value;
		const valuesArray = valueDOM.value.split(',');
		const INDEX_IN_WORD = valuesArray[2];
		const REPLACE_LETTER = valuesArray[1];

		if (valuesArray.length === 1) {
			return;
		}

		setWlc(prev => {
			prev[INDEX_IN_WORD] = REPLACE_LETTER;
			const newLettersArray = [...prev];
			return newLettersArray;
		});

		setSecretProgress(prev => prev + 1);
	}, []);

	const resetSecretWord = useCallback(() => {
		setSecretProgress(0);
		setWlc(['W', 'e', ['l', '-', 2], 'c', ['o', 'u', 4], 'm', ['e', '?', 6]]);
	}, []);

	return (
		<HomePageContext.Provider
			value={{
				quote,
				charHandler,
				resetSecretWord,
				wlc,
				secretProgress,
				language,
				setLanguage,
			}}>
			<HomePageContainer />
		</HomePageContext.Provider>
	);
}

export default HomePage;
