import Nav from '@/components/Nav';
import { useRouter } from 'next/router';

export default function CreatePost() {
	const router = useRouter();
	return (
		<div className='border-2 border-red-500 min-h-screen mx-auto bg-slate-300/70'>
			<Nav />
			<div className=''>
				<h1 className='text-center text-xl tracking-wide font-extrabold pt-8'>
					Create A Post
				</h1>

				<div>
					<div>line 1</div>
					<div>line 1</div>
					<div>line 1</div>
				</div>
			</div>
		</div>
	);
}
