import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type RegisterData = {
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	password: string;
	profileImage?: string;
};

export default function Register() {
	const [userData, setUserData] = useState<RegisterData>({} as RegisterData);
	const router = useRouter();

	// Event Handlers
	const handleFirstName = (e: any) => {
		const input = e.target.value;
		setUserData({
			...userData,
			firstname: input,
		});
	};

	const handleLastName = (e: any) => {
		const input = e.target.value;
		setUserData({
			...userData,
			lastname: input,
		});
	};

	const handleEmail = (e: any) => {
		const input = e.target.value;
		setUserData({
			...userData,
			email: input,
		});
	};

	const handleUsername = (e: any) => {
		const input = e.target.value;
		setUserData({
			...userData,
			username: input,
		});
	};

	const handlePass = (e: any) => {
		const input = e.target.value;
		setUserData({
			...userData,
			password: input,
		});
	};

	const handleRegister = (e: any) => {
		e.preventDefault();
		_register();
	};

	async function _register() {
		await axios({
			url: 'http://localhost:4000/register',
			method: 'POST',
			data: userData,
		})
			.then(({ data }) => {
				if (data.status === 201) {
					console.log('Registration was a success! Data used:', data);
					router.push(`/Login`);
				} else {
					console.log('errors out here', data);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<div className='flex justify-center h-screen'>
			<div className='border border-purple-500 shadow-md rounded-lg items-center justify-center text-center justify-items-center my-auto'>
				<h1 className='text-purple-400/90 font-semibold text-2xl mt-2'>
					Sign Up
				</h1>
				<form className='flex flex-col space-y-2 pt-2 m-7 w-[30vw]'>
					<input
						onChange={handleFirstName}
						value={userData.firstname}
						type=''
						placeholder='First Name'
						className='ml-2'></input>
					<input
						onChange={handleLastName}
						value={userData.lastname}
						type=''
						placeholder='Last Name'
						className='ml-2'></input>
					<input
						onChange={handleEmail}
						value={userData.email}
						type='email'
						placeholder='Email'
						className='ml-2'></input>
					<input
						onChange={handleUsername}
						value={userData.username}
						type=''
						placeholder='Username'
						className='ml-2'></input>
					<input
						onChange={handlePass}
						value={userData.password}
						type='password'
						placeholder='Password'
						className='ml-2'></input>
				</form>
				<button
					onClick={handleRegister}
					type='submit'
					className='font-semibold text-sm rounded-lg bg-purple-400/90 hover:bg-purple-300/75 cursor-pointer p-2 px-6 my-2'>
					Submit
				</button>
			</div>
		</div>
	);
}
