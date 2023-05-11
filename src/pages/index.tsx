import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { allPostsURL } from '../../utils';
import axios from 'axios';
import Nav from '@/components/Nav';
import PostCard from '@/components/PostCard';
import { tokenState } from '@/atom/state';
import { useRecoilState } from 'recoil';

export default function Home() {
	// STATE
	const [posts, setPosts] = useState({} as any);
	const [token, setToken] = useRecoilState(tokenState as any);

	const router = useRouter();

	useEffect(() => {
		if (token !== null) {
			localStorage.setItem('token', String(token));

			axios
				.get(allPostsURL, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setPosts(res);
				});
		}
	}, [token]);

	if (token !== null) {
		return (
			<>
				<div className='border-2 border-red-500 min-h-screen mx-auto bg-slate-300/70'>
					<Nav />
					<div className=''>
						<h1 className='text-center text-2xl tracking-wide font-extrabold pt-8'>
							Most Recent Posts
						</h1>
						<button
							onClick={() => router.push(`/CreatePost`)}
							className='float-right mr-28 font-semibold text-sm rounded-md bg-purple-400/90 hover:bg-purple-300/75 cursor-pointer px-2 py-1'>
							Make A Post
						</button>
						{/* @ts-ignore */}
						{posts?.data?.map((post: any) => (
							<PostCard key={post?.id} post={post} />
						))}
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className='border-2 border-red-500 min-h-screen mx-auto bg-slate-300/70'>
					<Nav />
					<div className='text-center space-y-8'>
						<h1 className='text-3xl tracking-wide font-extrabold pt-8'>
							Welcome to fSocial
						</h1>
						<p className='text-md'>
							Log in or sign up to view and comment on friends posts!
						</p>
					</div>
				</div>
			</>
		);
	}
}
