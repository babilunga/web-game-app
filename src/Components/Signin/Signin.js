import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './signin.css';

function Signin({ auth }) {
	function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = GoogleAuthProvider.credentialFromError(error);

				console.log({ errorCode, errorMessage, email, credential });
			});
	}
	return (
		<button onClick={signInWithGoogle}>
			Sign In{' '}
			<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
				<path d='M20.55 32.75 18.4 30.6 23.5 25.5H6V22.5H23.4L18.3 17.4L20.45 15.25L29.25 24.05ZM24.45 42V39H39Q39 39 39 39Q39 39 39 39V9Q39 9 39 9Q39 9 39 9H24.45V6H39Q40.2 6 41.1 6.9Q42 7.8 42 9V39Q42 40.2 41.1 41.1Q40.2 42 39 42Z' />
			</svg>
		</button>
	);
}

export default Signin;
