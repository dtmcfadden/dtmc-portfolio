import Header from '../header/header';
import Footer from '../footer/footer';

interface Props {
	navLinks: any;
	children: React.ReactNode;
}

export default function Layout({ navLinks, children }: Props) {
	return (
		<>
			<Header navLinks={navLinks} />
			<main>{children}</main>
			<Footer />
		</>
	);
}
