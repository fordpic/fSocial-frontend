import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { allPostsURL } from '../../utils';
import axios from 'axios';
import Nav from '@/components/Nav';
import PostCard from '@/components/PostCard';
import {
	tokenState,
	userIdState,
	usernameState,
	websiteState,
} from '@/atom/state';
import { useRecoilState } from 'recoil';

// Cookie for Auth
let cookie = '';

// Cookie Logic
// if (document?.cookie !== 'token=' || document?.cookie) {
// 	if (document.cookie[0] === 't') {
// 		let newCookie = document.cookie.split('');
// 		newCookie.splice(0, 6);
// 		cookie = newCookie.join('');
// 	} else {
// 		cookie = document.cookie;
// 	}
// }

export default function Home() {
	// STATE
	const [posts, setPosts] = useState({} as any);
	const [loaded, setLoaded] = useState(false);
	const [token, setToken] = useRecoilState(tokenState as any);
	const [username, setUsername] = useRecoilState(usernameState as any);
	const [userId, setUserId] = useRecoilState(userIdState as any);

	const router = useRouter();

	// if (localStorage.getItem('userId')) {
	// 	setUserId(Number(localStorage.getItem('userId')));
	// }

	// if (localStorage.getItem('username')) {
	// 	setUsername(localStorage.getItem('username'));
	// }

	// if (cookie) {
	// 	setToken(cookie);
	// }

	useEffect(() => {
		axios.get(allPostsURL).then((res) => {
			setPosts(res);
			setLoaded(true);
		});
		console.log(posts);
	}, []);

	if (!loaded) {
		return null;
	} else {
		return (
			<>
				<div className='border-2 border-red-500 min-h-screen mx-auto bg-slate-300/70'>
					<Nav />
					<div className=''>
						{/* @ts-ignore */}
						<h1 className='text-center text-xl tracking-wide font-extrabold pt-8'>
							Most Recent Posts
						</h1>
						{posts?.data?.map((post: any) => (
							<PostCard key={post?.id} post={post} />
						))}
					</div>
				</div>
			</>
		);
	}
}
