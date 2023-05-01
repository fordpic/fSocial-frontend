import { useState, useEffect } from 'react';
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
	const [posts, setPosts] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [token, setToken] = useRecoilState(tokenState);
	const [username, setUsername] = useRecoilState(usernameState);
	const [userId, setUserId] = useRecoilState(userIdState);

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
						{posts?.data?.map((post: any) => (
							<PostCard key={post?.id} post={post} />
						))}
					</div>
				</div>
			</>
		);
	}
}
