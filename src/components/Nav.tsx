import NavButton from './NavButton';
import Login from './Login';

export default function Nav() {
	return (
		<div className='border border-pink-400 p-4 flex'>
			<span className='font-bold text-xl text-purple-500'>fSocial</span>
			<div className='flex ml-6 space-x-3'>
				<NavButton>Register</NavButton>
				<NavButton>Sign In</NavButton>
				<Login />
			</div>
		</div>
	);
}
