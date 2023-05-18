import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { tokenState } from '@/atom/state';
import { useRecoilState } from 'recoil';
import { apiURL } from '../../utils';
import Nav from '@/components/Nav';
import PostCard from '@/components/PostCard';

export default function Home() {
	const [posts, setPosts] = useState({} as any);
	const [token, setToken] = useRecoilState(tokenState as any);

	const router = useRouter();

	useEffect(() => {
		if (token !== null) {
			localStorage.setItem('token', String(token));

			axios
				.get(`${apiURL}/posts`, {
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
				<div className='border border-purple-500 min-h-screen mx-auto bg-slate-300/70'>
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
				<div className='border border-purple-500 min-h-screen mx-auto bg-slate-300/70'>
					<Nav />
					<div className='text-center space-y-10'>
						<h1 className='text-3xl tracking-wide font-extrabold pt-8'>
							Welcome to <span className='text-purple-400/90'>fSocial</span>
						</h1>

						<p className='text-md font-semibold'>
							Log in or sign up to view and comment on friends posts!
						</p>

						<p className='text-md font-semibold'>
							fSocial is a place for friends to come together and stay
							connected, no matter where they are in the world
						</p>

						<p className='pt-24 text-2xl font-semibold'>
							&quot;Falling out of{' '}
							<span className='font-extrabold text-purple-400/90'>touch</span>{' '}
							is out of{' '}
							<span className='font-extrabold text-purple-400/90'>style</span>
							&quot; - Me
						</p>
					</div>
				</div>
			</>
		);
	}
}
