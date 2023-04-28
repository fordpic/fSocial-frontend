import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Fetcher, SWRConfig } from 'swr';

// TODO: fix type below
// @ts-ignore
const fetcher: Fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig value={{ fetcher }}>
			<Component {...pageProps} />
		</SWRConfig>
	);
}
