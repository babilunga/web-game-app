import React, { useEffect, useRef, useState } from 'react';
import WelcomeContainer from './WelcomeContainer';

function Welcome() {
	const [quote, setQuote] = useState({});
	const [currentMeme, setCurrentMeme] = useState('');
	const [secretProgress, setSecretProgress] = useState(0);
	const memeSet = useRef([]);
	const [wlc, setWlc] = useState([
		'W',
		'e',
		['l', '\u00A0', 2],
		'c',
		['o', 'u', 4],
		'm',
		['e', '?', 6],
	]);

	useEffect(() => {
		if (secretProgress === 7) {
			quoteGeneration();
		}
	}, [secretProgress]);

	useEffect(() => {
		getMemes();
		quoteGeneration();
	}, []);

	async function quoteGeneration() {
		// lukePeavey/quotable random quotations API,
		// github repo: https://github.com/lukePeavey/quotable#list-quotes.
		const response = await fetch(
			'https://api.quotable.io/random?tags=romantic|love|friendship|friends&maxLength=100'
		);
		const quote = await response.json();
		setQuote(quote);
	}

	async function getMemes() {
		// https://meme-api.herokuapp.com/gimme
		const response = await fetch('https://api.imgflip.com/get_memes');
		const meme = await response.json();
		console.log(meme);
		memeSet.current = meme.data.memes;
	}

	async function memeGenerator() {
		// const response = await fetch('https://meme-api.herokuapp.com/gimme/mem');
		// const data = await response.json();
		// setCurrentMeme(data);

		setCurrentMeme(
			memeSet.current[Math.floor(Math.random() * memeSet.current.length)]
		);
	}

	function charHandler(e) {
		// take a value of the element that summon function
		// and split it by ',' because value sends as a String.
		const value = e.target.attributes.value.value.split(',');

		// add id to the element.
		e.target.id = 'welcome_word_appear';

		if (value.length === 1) {
			return;
		}

		setWlc((prev) => {
			prev[value[2]] = value[1];
			return prev.concat();
		});

		setSecretProgress((prev) => prev + 1);
	}

	return <WelcomeContainer wlc={wlc} charHandler={charHandler} quote={quote} />;
}

export default Welcome;
