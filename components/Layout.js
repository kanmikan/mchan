import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children }) => (
	<>
		<Head>
			<title>Mchan</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		{children}
	</>
)

export default Layout;