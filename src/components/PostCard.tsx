import { useRouter } from 'next/router';

export default function PostCard({ post }) {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/posts/${post?.id}`)}
			className='text-center p-2 mt-9 mx-24 space-y-2 bg-slate-400/60 hover:bg-slate-400/50 border border-purple-300 shadow-md'>
			<h1 className='text-purple-400 text-md font-semibold'>{post?.title}</h1>
			<h1 className='text-md'>{post?.author}</h1>
			<p className='text-sm text-ellipsis'>{post?.content}</p>
		</div>
	);
}
