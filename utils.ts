import axios from 'axios';

// API Endpoints (Local)
const allPostsURL = 'http://localhost:4000/posts';

// Display all current posts on homepage, regardless of login status
export const getPosts = async () => {
	try {
		const posts = await axios.get(allPostsURL);
		console.log(posts);
		return posts;
	} catch (err) {
		console.error(err);
	}
};

// Get user info
