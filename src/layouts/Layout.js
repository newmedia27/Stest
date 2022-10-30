import { Outlet } from "react-router"
import Footer from "../components/footer"
import Header from "../components/header/Header"
import AppLayout from "./AppLayout"
import Container from "./Container"

const Layout = () => {
	return (
		<AppLayout>
			<Container>
				<Header />
				<Outlet />
				<Footer/>
			</Container>
		</AppLayout>
	)
}

export { Layout }
