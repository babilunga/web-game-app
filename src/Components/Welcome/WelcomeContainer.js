import './welcome.css';

function WelcomeContainer(props) {
	const { wlc, charHandler, quote } = props;

	return (
		<section className='welcome_wrap'>
			<FlagImage />
			<div className='welcome_phrase'>
				<div className='welcome_word'>
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
				<p>to MemeDraw.</p>
			</div>
			<div className='quote_section'>
				<p className='quote_section_content'>{quote.content}</p>
				<p className='quote_section_author'>{quote.author}</p>
			</div>
		</section>
	);
}

function FlagImage() {
	return (
		<div className='welcome_flag'>
			<svg
				width='171'
				height='122'
				viewBox='0 0 171 122'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M0 61.211C86.2703 81.238 80.8784 39.6434 171 61.211V116.67C111.689 98.184 68.5541 133.616 0 116.67V61.211Z'
					fill='#FFE600'
				/>
				<path
					d='M0 7.06138C86.2703 27.0884 80.8784 -14.5062 171 7.06138V62.5208C111.689 44.0344 68.5541 79.4668 0 62.5208V7.06138Z'
					fill='#2400FF'
				/>
			</svg>
		</div>
	);
}

export default WelcomeContainer;
