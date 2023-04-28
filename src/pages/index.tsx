import { useState, useEffect } from 'react';
import { getPosts } from '../../utils';
import StdHome from '@/components/StdHome';
import Nav from '@/components/Nav';

// Make hooks for pulling all info from db, serverSideProps, then pass where needed

export default function Home() {
	// STATE
	const [posts, setPosts] = useState({});
	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const allPosts = getPosts();
		setPosts(allPosts);
	}, []);

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
