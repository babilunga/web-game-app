import React, { useEffect, useRef, useState } from 'react';
import './welcome.css';

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
		'\u00A0',
		't',
		'o',
		'\u00A0',
		'M',
		'e',
		'm',
		'e',
		'D',
		'r',
		'a',
		'w',
		'.',
	]);

	useEffect(() => {
		if (secretProgress === 7) {
			quoteGeneration();
		}
	}, [secretProgress]);

	useEffect(() => {
		getMemes();
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
		const element = e.target.attributes.value.value.split(',');

		if (element.length === 1) {
			return;
		}

		setWlc((prev) => {
			prev[element[2]] = element[1];
			return prev.concat();
		});

		setSecretProgress((prev) => prev + 1);
	}

	return (
		<section className='welcome'>
			<div className='wellcome_text'>
				{wlc.map((char, index) => {
					return (
						<span
							className={Array.isArray(char) ? 'secret' : ''}
							onClick={charHandler}
							value={char}
							key={index}>
							{char[0]}
						</span>
					);
				})}
			</div>
			<div className='quote_section'>
				<p className='quote_section_context'>{quote.content}</p>
				<p className='quote_section_author'>{quote.author}</p>
			</div>
			<button onClick={memeGenerator}>meme</button>
			<br />
			<img style={imageStyle} src={currentMeme.url} alt='meme' />
		</section>
	);
}

const imageStyle = {
	width: '70vw',
};

export default Welcome;
