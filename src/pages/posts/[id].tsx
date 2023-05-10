import axios from 'axios';
import Nav from '@/components/Nav';
import { allPostsURL } from '../../../utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { tokenState, userIdState } from '@/atom/state';
import { useRecoilValue } from 'recoil';

export default function Post() {
	const user = useRecoilValue(userIdState);
	const token = useRecoilValue(tokenState);
	const [postData, setPostData] = useState({} as any);

	const router = useRouter();
	const { id } = router.query;
	const post = `${allPostsURL}/${id}`;

	useEffect(() => {
		if (token !== null) {
			axios
				.get(post, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(({ data }) => {
					setPostData(data?.post);
					console.log(postData);
				});
		} else {
			console.log('Token not set');
		}
	}, []);

	return (
		<div>
			<div className='border-2 border-red-500 min-h-screen mx-auto bg-slate-300/70'>
				<Nav />
				<div className='flex-col text-center justify-center'>
					<h1 className='text-center text-xl tracking-wide font-extrabold pt-8'>
						{postData?.title}
					</h1>

					<h3>{postData?.authorId}</h3>

					<div className=''>
						<p>{postData.content}</p>
					</div>

					<button
						onClick={() => router.push(`/CreatePost`)}
						className='float-right mr-28 font-semibold text-sm rounded-md bg-purple-400/90 hover:bg-purple-300/75 cursor-pointer px-2 py-1'>
						Make A Post
					</button>
				</div>
			</div>
		</div>
	);
}
