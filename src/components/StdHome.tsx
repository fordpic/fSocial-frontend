export default function StdHome({ posts }) {
	return (
		<div className='flex justify-center items-center h-screen w-full border-2 border-green-500'>
			<div className='border border-purple-500 w-[75%] h-[70%] text-center justify-center'>
				{/* <div>
					{posts &&
						posts?.map((post: any) => {
							<div key={post.id}>{post}</div>;
						})}
				</div> */}
			</div>
		</div>
	);
}
