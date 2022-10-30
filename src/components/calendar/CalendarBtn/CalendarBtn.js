import classNames from "classnames"
import { useMemo } from "react"
import { useContext } from "react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { EventCtx } from "../../../screens/calendar/EventCalendar"
import Button from "../../Buton/Button"
import FilterIndicator from "../../filterIndicator/FilterIndicator"
import Popower from "../../popower/Popower"
import styles from "./style.module.sass"

export default function CalendarBtn({ children, active, className, ...props }) {
	const [state, setState] = useState(false)
	const { value: dateValue, ...attr } = props
	const { dateIds, events } = useContext(EventCtx)
	const [params] = useSearchParams()

	const data = useMemo(() => {
		const key = dateValue.valueOf()
		const selfEvents = dateIds[key]
		if (selfEvents) {
			return selfEvents.reduce((acc, e) => {
				acc = [...acc, { ...events[e], id: e }]
				return acc
			}, [])
		}
		return []
	}, [dateIds,events,dateValue])

	const eventTypes = useMemo(() => {
		if (!data.length) {
			return []
		}
		const group = new Set()
		data.forEach((e) => {
			group.add(e.event)
		})
		return [...group]
	}, [data])

	const filteredTypes = useMemo(() => {
		const getFilterKeys = Object.keys(Object.fromEntries([...params]))

		if (!getFilterKeys.length) {
			return eventTypes
		}

		const set = new Set(getFilterKeys)
		return eventTypes.filter((t) => set.has(t))
	}, [params, eventTypes])

	const handleClick = (e) => {
		active && setState(true)
	}
	return (
		<div className={styles.wrapper}>
			<Button
				className={classNames(styles.btn, className, {
					[styles.active]: active,
					[styles.selected]: state,
				})}
				onClick={handleClick}
				{...attr}
			>
				{children}
				<FilterIndicator
					active={active}
					id={dateValue.valueOf()}
					indicators={filteredTypes}
				/>
			</Button>
			{state && (
				<Popower
					close={() => {
						setState(false)
					}}
					dateValue={dateValue.valueOf()}
					data={data}
					filteredTypes={filteredTypes}
				/>
			)}
		</div>
	)
}
