type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
};

export default function NavButton(props: ButtonProps) {
	return (
		<button className='font-semibold text-sm rounded-md bg-purple-400/90 hover:bg-purple-300/75 cursor-pointer px-2'>
			{props.children}
		</button>
	);
}
