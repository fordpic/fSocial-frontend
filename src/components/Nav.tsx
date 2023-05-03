import NavButton from './NavButton';
import Login from './Login';
import { useRecoilState } from 'recoil';
import { modalState } from '@/atom/state';

export default function Nav() {
	const [open, setOpen] = useRecoilState(modalState);

	return (
		<div className='border border-pink-400 p-4 flex'>
			<span className='font-bold text-xl text-purple-500'>fSocial</span>
			<div className='flex ml-6 space-x-3'>
				<NavButton>Register</NavButton>
				<NavButton onClick={() => setOpen(true)}>Sign In</NavButton>
				<Login />
			</div>
		</div>
	);
}
