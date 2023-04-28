import { useState, useEffect } from 'react';
import { allPostsURL } from '../../utils';
import axios from 'axios';
import StdHome from '@/components/StdHome';
import Nav from '@/components/Nav';

// Make hooks for pulling all info from db, serverSideProps, then pass where needed

export default function Home() {
	// STATE
	const [posts, setPosts] = useState({});
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		axios.get(allPostsURL).then((res) => setPosts(res));
		console.log(posts);
		setLoading(false);
	}, []);

	if (loading) {
		return null;
	} else {
		return (
			<>
				<div className='border-2 border-red-500 min-h-screen mx-auto'>
					<Nav />
					<div>
						<StdHome posts={posts} />
						{/* Content goes here, conditionally rendered based on logged in or not */}
					</div>
				</div>
			</>
		);
	}
}
