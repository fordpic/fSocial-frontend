import { useRouter } from 'next/router';
import { usernameState } from '@/atom/state';
import { useRecoilValue } from 'recoil';

export default function Nav() {
	const router = useRouter();
	const username = useRecoilValue(usernameState);

	if (username === null) {
		return (
			<div className='border border-purple-400 shadow-sm p-4 flex'>
				<h1
					onClick={() => router.push(`/`)}
					className='font-bold text-xl text-purple-500 hover:cursor-pointer'>
					fSocial
				</h1>
				<div className='flex ml-6 space-x-3'>
					<button
						className='font-semibold text-sm rounded-md bg-purple-400/90 hover:bg-purple-300/75 cursor-pointer px-2'
						onClick={() => router.push(`/Register`)}>
						Register
					</button>
					<button
						className='font-semibold text-sm rounded-md bg-purple-400/90 hover:bg-purple-300/75 cursor-pointer px-2'
						onClick={() => router.push(`/Login`)}>
						Sign in
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className='border border-pink-400 p-4 flex'>
				<h1
					onClick={() => router.push(`/`)}
					className='font-bold text-xl text-purple-500 hover:cursor-pointer'>
					fSocial
				</h1>
				<div className='flex ml-6 space-x-3'>
					<h1>{`Welcome, ${username}!`}</h1>
				</div>
			</div>
		);
	}
}
