import "./App.sass"
import { Route, Routes } from "react-router"
import EventCalendar from "./screens/calendar/EventCalendar"
import { Layout } from "./layouts/Layout"

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/calendar" element={<EventCalendar />} />
				<Route path="/calendar?" element={<EventCalendar />} />
				<Route path="/events" element={<div className={"home"}>Events</div>} />
				<Route index element={<div className={"home"}>Home</div>} />
				<Route path="*" element={<div>No Match</div>} />
			</Route>
		</Routes>
	)
}

export default App
