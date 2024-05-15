import Footer from '../footer/footer'
import Header from '../header/header'

type LayoutProps = {
	children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
