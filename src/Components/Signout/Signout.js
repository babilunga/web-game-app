function Signout({ auth }) {
	return (
		auth.currentUser && (
			<button className='signout_button' onClick={() => auth.signOut()}>
				Exit 🚪
			</button>
		)
	);
}

export default Signout;
