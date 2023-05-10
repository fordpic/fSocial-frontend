import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { allPostsURL } from '../../utils';
import axios from 'axios';
import Nav from '@/components/Nav';
import PostCard from '@/components/PostCard';
import { tokenState, userIdState, usernameState } from '@/atom/state';
import { useRecoilState, useRecoilValue } from 'recoil';

let cookie = '';

if (document.cookie !== 'token=' || document.cookie) {
	if (document.cookie[0] === 't') {
		let newCookie = document.cookie.split('');
		newCookie.splice(0, 6);
		cookie = newCookie.join('');
	} else {
		cookie = document.cookie;
	}
}

export default function Home() {
	// STATE
	const [posts, setPosts] = useState({} as any);
	const [loaded, setLoaded] = useState(false);
	const [userData, setUserData] = useState({});
	const [token, setToken] = useRecoilState(tokenState as any);
	const [username, setUsername] = useRecoilState(usernameState as any);
	const [userId, setUserId] = useRecoilState(userIdState as any);

	const router = useRouter();

	useEffect(() => {
		axios
			.get(`http://localhost:4000/users/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(({ data }) => {
				setUserData(data);

				// Store user data in browser so it persists - first visit
				localStorage.setItem('userId', String(userId));
				localStorage.setItem('username', data.user.username);
			});
	}, []);

	// Sets data on continual visits / renders
	if (localStorage.getItem('userId')) {
		setUserId(Number(localStorage.getItem('userId')));
	}

	if (localStorage.getItem('username')) {
		setUsername(localStorage.getItem('username'));
	}

	if (cookie) setToken(cookie);

	useEffect(() => {
		if (token !== null) {
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
	}, []);

	if (token !== null) {
		return (
			<>
				<div className='border-2 border-red-500 min-h-screen mx-auto bg-slate-300/70'>
					<Nav />
					<div className=''>
						<h1 className='text-center text-xl tracking-wide font-extrabold pt-8'>
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
					<div className=''>
						<h1 className='text-center text-xl tracking-wide font-extrabold pt-8'>
							Welcome to fSocial! Log in or sign up to view and comment on
							friends posts!
						</h1>
					</div>
				</div>
			</>
		);
	}
}
