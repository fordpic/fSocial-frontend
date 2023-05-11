import axios from 'axios';
import Nav from '@/components/Nav';
import { allPostsURL } from '../../../utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { tokenState, userIdState } from '@/atom/state';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Post() {
	const user = useRecoilValue(userIdState);
	const token = useRecoilValue(tokenState);
	const [postData, setPostData] = useState({} as any);
	const [commentData, setCommentData] = useState({} as any);

	const router = useRouter();
	const { id } = router.query;
	const post = `${allPostsURL}/${id}`;

	const handleComment = (e: any) => {
		e.preventDefault();
		_comment();
	};

	const _comment = async () => {
		await axios({
			url: `http://localhost:4000/comments/create/${id}`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				content: commentData,
			},
		}).then(({ data }) => {
			console.log('Commented successfully! Data: ', data);
			router.push(`/posts/${id}`);
		});
	};

	useEffect(() => {
		try {
			axios
				.get(post, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(({ data }) => {
					setPostData(data);
					console.log(postData);
				});
		} catch (err) {
			console.log('Token not set', err);
		}
	}, []);

	return (
		<div>
			<div className='border-2 border-red-500 min-h-screen mx-auto bg-slate-300/70'>
				<Nav />
				<div className='flex-col text-center justify-center space-y-2'>
					<h1 className='text-center text-3xl text-purple-400/90 tracking-wide font-extrabold pt-8'>
						{postData?.post?.title}
					</h1>

					<h3>{postData?.post?.authorId}</h3>

					<div className='border-2 border-purple-400 rounded-lg p-10 mx-40 h-[55vh] max-h-fit shadow-md shadow-purple-300/95'>
						<p>{postData?.post?.content}</p>
					</div>

					<div className='pt-4 space-y-3'>
						<h1 className='text-3xl font-bold tracking-wide'>Comments</h1>
						{postData?.post?.comments[0] ? (
							postData?.post?.comments?.map((comment: any) => (
								<div
									className='border border-purple-400 mx-48 py-12 rounded-lg shadow-md'
									key={comment?.id}>
									<p className='pb-3 text-md font-semibold'>
										{comment?.content}
									</p>
									<h1>{dayjs(comment?.createdAt).format('MM/DD/YYYY')}</h1>
									<h3 className='text-sm'>
										{dayjs(comment?.createdAt).fromNow()}
									</h3>
								</div>
							))
						) : (
							<p className='pt-3 text-md font-semibold'>No comments yet!</p>
						)}
					</div>

					<div className='flex flex-col items-center space-y-2'>
						<textarea
							onChange={(e) => setCommentData(e.target.value)}
							className='w-[40vw] h-48'></textarea>
						<button
							onClick={handleComment}
							type='submit'
							className='font-semibold text-sm rounded-md bg-purple-400/90 hover:bg-purple-300/75 cursor-pointer px-3.5 py-2'>
							Comment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
