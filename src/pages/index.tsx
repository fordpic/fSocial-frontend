import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { allPostsURL } from '../../utils';
import axios from 'axios';
import StdHome from '@/components/StdHome';
import Nav from '@/components/Nav';

// Make hooks for pulling all info from db, serverSideProps, then pass where needed

export default function Home({ allPosts }) {
	// STATE
	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<>
			<div className='border-2 border-red-500 min-h-screen mx-auto'>
				<Nav />
				<div>
					<StdHome posts={allPosts} />
					{/* Content goes here, conditionally rendered based on logged in or not */}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const allPosts = await axios.get(allPostsURL);
	console.log(allPosts);

	return {
		props: { allPosts: allPosts || null },
	};
}
