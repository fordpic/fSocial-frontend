import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState, usernameState } from '@/atom/state';
import axios from 'axios';
import { useRouter } from 'next/router';

type UserDataType = {
	email: string;
	password: string;
};

export default function Login() {
	// STATE
	const [token, setToken] = useRecoilState(tokenState);
	const [userId, setUserId] = useRecoilState(userIdState);
	const [username, setUsername] = useRecoilState(usernameState);

	const [userData, setUserData] = useState<UserDataType>({} as UserDataType);
	const [error, setError] = useState('none');

	const router = useRouter();

	// Event Handlers
	const handleEmail = (e: any) => {
		const input = e.target.value;
		setUserData({
			...userData,
			email: input,
		});
	};

	const handlePass = (e: any) => {
		const input = e.target.value;
		setUserData({
			...userData,
			password: input,
		});
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
					setUserId(data?.id);
					setUsername(data?.user.username);
					setToken(data?.signedJwt);
					console.log('Login was a success! Data used:', data);
					router.push(`/`);
				} else if (data.message === 'Incorrect email') {
					setError('EMAIL_ERR');
					setErrBackToNone();
				} else if (data.message === 'Incorrect Password') {
					setError('PASSWORD_ERR');
					setErrBackToNone();
				} else {
					return console.log('errors out here', data);
				}
			})
			.catch((err) => {
				console.error(err);
				setError('SERVER_ERR');
				setErrBackToNone();
			});
	}
	return (
		<div className='flex justify-center h-screen'>
			<div className='border border-purple-500 shadow-md rounded-lg items-center justify-center text-center justify-items-center my-auto'>
				<h1 className='text-purple-400/90 font-semibold text-2xl mt-2'>
					Log In
				</h1>
				<form className='flex flex-col space-y-2 pt-2 m-7 w-[30vw]'>
					<input
						onChange={handleEmail}
						value={userData.email}
						type='email'
						placeholder='Email'
						className='ml-2'></input>
					<input
						onChange={handlePass}
						value={userData.password}
						type='password'
						placeholder='Password'
						className='ml-2'></input>
				</form>
				<button
					onClick={handleLogin}
					type='submit'
					className='font-semibold text-sm rounded-lg bg-purple-400/90 hover:bg-purple-300/75 cursor-pointer p-2 px-6 my-2'>
					Submit
				</button>
			</div>
		</div>
	);
}
