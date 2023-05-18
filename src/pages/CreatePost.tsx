import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { tokenState } from '@/atom/state';
import { useRecoilValue } from 'recoil';
import { apiURL } from '../../utils';
import Nav from '@/components/Nav';

export default function CreatePost() {
	const [postContent, setPostContent] = useState('');
	const [postTitle, setPostTitle] = useState('');

	const token = useRecoilValue(tokenState);

	const router = useRouter();

	const handlePost = (e: any) => {
		e.preventDefault();
		_post();
	};

	const _post = async () => {
		await axios({
			url: `${apiURL}/posts/create`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				title: postTitle,
				content: postContent,
				published: true,
			},
		}).then(({ data }) => {
			console.log('Posted successfully! Data: ', data);
			router.push(`/posts/${data.post.id}`);
		});
	};

	return (
		<div className='border-2 border-red-500 min-h-screen mx-auto bg-slate-300/70'>
			<Nav />
			<div className=''>
				<h1 className='text-center text-xl tracking-wide font-extrabold pt-8'>
					Create A Post
				</h1>

				<div className='border border-pink-400'>
					<form className='flex flex-col items-center space-y-4 bg-black mx-24 pt-8 mb-40 h-[45vh] border border-green-300'>
						<input
							onChange={(e) => setPostTitle(e.target.value)}
							placeholder='Post Title'
							className='h-10 w-[90%] text-center'></input>
						<textarea
							onChange={(e) => setPostContent(e.target.value)}
							placeholder='Write your post here...'
							className='h-40 w-[90%]'></textarea>
						<button
							onClick={handlePost}
							className='font-semibold text-sm rounded-lg bg-purple-400/90 hover:bg-purple-300/75 cursor-pointer p-2 px-6'>
							Post
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
