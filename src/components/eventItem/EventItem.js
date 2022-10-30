import { format } from "date-fns"
import Button from "../Buton/Button"
import styles from "./style.module.sass"
import EditIcon from "../icons/edit"
import { FilterItemWrapper } from "../filter/FilterItem"
import { filters } from "../filters/utils"
import { useContext } from "react"
import { EventCtx } from "../../screens/calendar/EventCalendar"

export default function EventItem({ data }) {
	const { name, description, location, event, time, id } = data
	const { handleModal } = useContext(EventCtx)
	return (
		<div className={styles.container}>
			<div className={styles.title__wrapper}>
				<h3 className={styles.title}>{name}</h3>
				<Button value={id} onClick={handleModal} role="edit">
					<EditIcon />
				</Button>
			</div>
			<div className={styles.description}>{description}</div>
			<div className={styles.location}>{location}</div>
			<FilterItemWrapper
				wrapperClassName={styles.title__wrapper}
				name={event}
				label={filters[event].text}
				className={styles.current__event}
			>
				<span className={styles.currentDay}>{format(new Date(time),"d LLL H:mm")}</span>
			</FilterItemWrapper>
		</div>
	)
}
