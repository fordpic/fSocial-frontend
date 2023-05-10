import NavButton from './NavButton';
import { useRouter } from 'next/router';
import { usernameState } from '@/atom/state';
import { useRecoilValue } from 'recoil';

export default function Nav() {
	const router = useRouter();
	const username = useRecoilValue(usernameState);

	if (username === null) {
		return (
			<div className='border border-pink-400 p-4 flex'>
				<span
					onClick={() => router.push(`/`)}
					className='font-bold text-xl text-purple-500'>
					fSocial
				</span>
				<div className='flex ml-6 space-x-3'>
					<NavButton>Register</NavButton>
					<button onClick={() => router.push(`/Login`)}>Sign in</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className='border border-pink-400 p-4 flex'>
				<span className='font-bold text-xl text-purple-500'>fSocial</span>
				<div className='flex ml-6 space-x-3'>
					<h1>{`Welcome, ${username}!`}</h1>
				</div>
			</div>
		);
	}
}
