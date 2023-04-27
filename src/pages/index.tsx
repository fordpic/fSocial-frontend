import StdHome from '@/components/StdHome';
import Nav from '@/components/Nav';

export default function Home() {
	return (
		<>
			<div className='border-2 border-red-500 min-h-screen mx-auto'>
				<Nav />
				<div>
					<StdHome />
					{/* Content goes here, conditionally rendered based on logged in or not */}
				</div>
			</div>
		</>
	);
}
