import { useState, useEffect } from 'react';
import { allPostsURL } from '../../utils';
import axios from 'axios';
import Nav from '@/components/Nav';
import PostCard from '@/components/PostCard';

// Make hooks for pulling all info from db, serverSideProps, then pass where needed

export default function Home() {
	// STATE
	const [posts, setPosts] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);
	const [loaded, setLoaded] = useState(false);

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
						{/* Content goes here, conditionally rendered based on logged in or not */}
					</div>
				</div>
			</>
		);
	}
}
