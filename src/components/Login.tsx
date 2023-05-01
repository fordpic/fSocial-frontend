import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
	modalState,
	tokenState,
	userIdState,
	usernameState,
} from '@/atom/state';
import Modal from 'react-modal';
import axios from 'axios';

// TODO: Make userData type

export default function Login() {
	// STATE
	const [open, setOpen] = useRecoilState(modalState);
	const [token, setToken] = useRecoilState(tokenState);
	const [userId, setUserId] = useRecoilState(userIdState);
	const [username, setUsername] = useRecoilState(usernameState);

	const [input, setInput] = useState('');
	const [userData, setUserData] = useState({});
	const [error, setError] = useState('none');

	// Event Handlers
	const handleInput = (e: any) => {
		const input = { ...userData };
		input[e.target.id] = e.target.value;
		setUserData(input);
	};

	const handleLogin = (e: any) => {
		e.preventDefault();
		_login();
	};

	// Helper func to refresh error code (for sign in & sign up)
	const setErrBackToNone = () => {
		setTimeout(() => {
			setError('none');
		}, 3000);
	};

	async function _login() {
		if (!userData.email && !userData.password) {
			setError('DATA_ERR');
			setErrBackToNone();
			return;
		} else if (!userData.email) {
			setError('EMAIL_ERR');
			setErrBackToNone();
			return;
		} else if (!userData.password) {
			setError('PASSWORD_ERR');
			setErrBackToNone();
			return;
		}

		await axios({
			url: 'localhost',
			method: 'POST',
			data: userData,
		})
			.then(({ data }) => {
				if (data.status === 200) {
					setUserId(data.id);
					setUsername(data.username);
					setToken(data.signedJwt);
				} else if (data.message === 'Incorrect Email') {
					setError('EMAIL_ERR');
					setErrBackToNone();
				} else if (data.message === 'Incorrect Password') {
					setError('PASSWORD_ERR');
					setErrBackToNone();
				}
			})
			.catch(() => {
				setError('SERVER_ERR');
				setErrBackToNone();
			});
	}

	return (
		<div>
			{open && (
				<Modal
					isOpen={open}
					onRequestClose={() => setOpen(false)}
					className='border border-pink-400'>
					<div>
						LOGIN
						<div>X</div>
						<div>
							<textarea></textarea>
						</div>
						<button></button>
					</div>
				</Modal>
			)}
		</div>
	);
}
