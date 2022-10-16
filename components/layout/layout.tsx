import Header from '../header/header';
import Footer from '../footer/footer';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
