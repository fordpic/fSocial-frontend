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
import { XMarkIcon } from '@heroicons/react/24/outline';

// TODO: Make userData type
type UserDataType = {
	email: string;
	password: string;
};

export default function Login() {
	// STATE
	const [open, setOpen] = useRecoilState(modalState);
	const [token, setToken] = useRecoilState(tokenState);
	const [userId, setUserId] = useRecoilState(userIdState);
	const [username, setUsername] = useRecoilState(usernameState);

	// const [input, setInput] = useState('');
	const [userData, setUserData] = useState<UserDataType>({} as UserDataType);
	const [error, setError] = useState('none');

	// Event Handlers
	const handleInput = (e: any) => {
		const input = { ...userData };
		// input[e.target.id] = e.target.value;
		setUserData(input);
		console.log(userData);
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
			url: 'http://localhost:4000/login',
			method: 'POST',
			data: userData,
		})
			.then(({ data }) => {
				if (data.status === 200) {
					setUserId(data.id);
					setUsername(data.username);
					setToken(data.signedJwt);
					console.log('Login was a success! Data used:', data);
				} else if (data.message === 'Incorrect email') {
					setError('EMAIL_ERR');
					console.log(error);
					setErrBackToNone();
				} else if (data.message === 'Incorrect Password') {
					setError('PASSWORD_ERR');
					console.log(error);
					setErrBackToNone();
				}
			})
			.catch((err) => {
				console.error(err);
				setError('SERVER_ERR');
				setErrBackToNone();
			});
	}

	return (
		<div>
			{open && (
				<Modal isOpen={open} onRequestClose={() => setOpen(false)} className=''>
					<div className='text-center max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md p-4'>
						<div className='flex justify-between items-center border border-pink-300'>
							<div className='mx-auto text-xl font-bold'>Log In</div>
							<div
								onClick={() => setOpen(false)}
								className='border border-blue-300'>
								<XMarkIcon className='h-5' />
							</div>
						</div>
						<form className='flex flex-col space-y-2 pt-2'>
							<input
								onChange={handleInput}
								value={userData.email}
								type='email'
								placeholder='Email'></input>
							<input
								onChange={handleInput}
								value={userData.password}
								type='password'
								placeholder='Password'></input>
						</form>
						<button
							onClick={handleLogin}
							type='submit'
							className='font-semibold text-sm rounded-lg bg-purple-400/90 hover:bg-purple-300/75 cursor-pointer p-2 px-6 mt-1'>
							Submit
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
}
