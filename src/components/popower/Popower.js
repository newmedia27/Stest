import { useContext, useMemo } from "react"
import { useRef } from "react"
import { EventCtx } from "../../screens/calendar/EventCalendar"
import Button from "../Buton/Button"
import EventItem from "../eventItem/EventItem"
import useClickOutside from "../hooks/useClickOutside"
import styles from "./style.module.sass"

export default function Popower({ close, dateValue, data, filteredTypes }) {
	const ref = useRef(null)
	useClickOutside(ref, close)
	const { handleModal } = useContext(EventCtx)

	const sortData = useMemo(() => {
		const set = new Set(filteredTypes)
		const date = data.filter((d) => set.has(d.event))
		return date.sort(function (a, b) {
			return a.time - b.time
		})
	}, [data,filteredTypes])

	return (
		<div className={styles.wrapper} ref={ref}>
			<div className={styles.content}>
				<h2 className={styles.title}>Events</h2>
				{sortData?.length > 0 &&
					sortData.map((d) => (
						<EventItem key={d.id} dateValue={dateValue} data={d} />
					))}
				<div className={styles.addButton__wrapper}>
					<Button
						className={styles.addButton}
						value={dateValue}
						onClick={handleModal}
						role="create"
					>
						Add event
					</Button>
				</div>
			</div>
		</div>
	)
}
