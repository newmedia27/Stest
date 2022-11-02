import styles from "./style.module.sass"
import Calendar from "../../components/calendar/Calendar"
import { getDateArrays } from "../../components/calendar/Calendar/utils"
import Filters from "../../components/filters"
import Modal from "../../components/modal"
import { useState, createContext, useMemo, Fragment } from "react"
import Close from "../../components/icons/close"
import { Field, Formik, Form } from "formik"
import InputControl from "../../components/form/input/InputControl"
import SelectControl from "../../components/form/select/SelectControl"
import { eventsCategory } from "./utils"
import Button from "../../components/Buton/Button"
import { format } from "date-fns"
import { v4 as uuidv4 } from "uuid"

const currentDate = new Date()
const needItems = 6
const row = 2
const dataArr = getDateArrays(currentDate, needItems, row)

const getEvents = JSON.parse(localStorage.getItem("events")) || {}
const getDateIds = JSON.parse(localStorage.getItem("dateIds")) || {}

export const EventCtx = createContext()

export default function EventCalendar() {
	const [openModal, setOpenModal] = useState(false)
	const [activeDate, setActiveDate] = useState(NaN)
	const [activeEvent, setActiveEvent] = useState("")
	const [events, setEvents] = useState(getEvents)
	const [dateIds, setDateIds] = useState(getDateIds)

	const handleModal = ({ currentTarget }) => {
		const { value } = currentTarget
		const role = currentTarget.getAttribute("role")
		if (role === "create") {
			setActiveDate(+value)
		} else {
			setActiveEvent(value)
		}
		setOpenModal(true)
	}

	const closeModal = () => {
		setActiveDate(NaN)
		setActiveEvent("")
		setOpenModal(false)
	}

	const editEvent = useMemo(() => {
		if (!activeEvent) {
			return null
		}
		return { ...events[activeEvent], id: activeEvent }
	}, [activeEvent, events])

	const handleCreate = (values) => {
		const { event, ...fields } = values
		const id = uuidv4()

		setEvents((s) => {
			const newState = {
				...s,
				[id]: { ...fields, event },
			}
			localStorage.setItem("events", JSON.stringify(newState))
			return newState
		})
		setDateIds((s) => {
			if (!s[activeDate]) {
				s[activeDate] = []
			}
			const newState = { ...s, [activeDate]: [...s[activeDate], id] }
			localStorage.setItem("dateIds", JSON.stringify(newState))
			return newState
		})
	}

	const handleEdit = (values) => {
		setEvents((s) => {
			const state = { ...s, [activeEvent]: { ...s[activeEvent], ...values } }
			localStorage.setItem("events", JSON.stringify(state))
			return state
		})
	}

	const handleSubmit = (values) => {
		if (activeDate) {
			handleCreate(values)
		}

		if (activeEvent) {
			handleEdit(values)
		}

		closeModal()
	}

	const handleDelete = () => {
		const id = activeEvent
		const { currentDate } = events[id]

		setEvents((s) => {
			delete s[id]
			localStorage.setItem("events", JSON.stringify(s))
			return s
		})
		setDateIds((s) => {
			const state = {
				...s,
				[currentDate]: [...s[currentDate].filter((e) => e !== id)],
			}
			localStorage.setItem("dateIds", JSON.stringify(state))
			return state
		})
		closeModal()
	}

	return (
		<div className={styles.Wrapper}>
			<h1 className={styles.title}>Calendar</h1>
			<Filters />
			<div className={styles.Container}>
				<EventCtx.Provider value={{ openModal, handleModal, events, dateIds }}>
					{dataArr.map((e, i) => (
						<Fragment key={e.valueOf()}>
							{i !== 0 && Math.abs(i % 3) === 0 && (
								<div className={styles.border} />
							)}
							<Calendar currentDate={e} />
						</Fragment>
					))}
				</EventCtx.Provider>
			</div>
			<Modal isOpen={openModal} onClose={closeModal}>
				{(close) => (
					<FormCRUD
						close={close}
						onSubmit={handleSubmit}
						activeDate={activeDate}
						event={editEvent}
						handleDelete={handleDelete}
					/>
				)}
			</Modal>
		</div>
	)
}

function FormCRUD({ close, onSubmit, activeDate, event, handleDelete }) {
	const timeOptions = useMemo(() => {
		const date = new Date(event?.currentDate || activeDate)
		const m = date.getMonth()
		const y = date.getFullYear()
		const d = date.getDate()
		return Array.from(new Array(24), (_, i) => {
			return { label: `${i}:00`, value: new Date(y, m, d, i).valueOf() }
		})
	}, [activeDate, event])

	const initialValues = useMemo(() => {
		return {
			name: event?.name || "",
			description: event?.description || "",
			location: event?.location || "",
			time: new Date(event?.time).valueOf() || timeOptions[0].value,
			event: event?.event || eventsCategory[0].value,
			currentDate: event?.currentDate || activeDate,
		}
	}, [event, activeDate, timeOptions])

	return (
		<div className={styles.form__wrapper}>
			<div className={styles.form__header}>
				<h2>Add event</h2>
				<Button type="button" onClick={close}>
					<Close />
				</Button>
			</div>

			<Formik initialValues={initialValues} onSubmit={onSubmit}>
				{({ values }) => {
					return (
						<Form>
							<Field
								component={InputControl}
								name="name"
								placeholder="Event name..."
							/>
							<Field
								component={InputControl}
								variant="textarea"
								name="description"
								placeholder="Event description..."
							/>
							<Field
								component={InputControl}
								name="location"
								placeholder="Location..."
							/>
							<div className={styles.time__wrapper}>
								<span className={styles.time__title}>{`${format(
									new Date(values.currentDate),
									"d LLL"
								)} at`}</span>
								<Field
									component={SelectControl}
									name="time"
									options={timeOptions}
									className={styles.time}
								/>
							</div>
							<Field
								component={SelectControl}
								name="event"
								options={eventsCategory}
							/>
							<div className={styles.btn__container}>
								<Button onClick={close} className={styles.cancel}>
									Cancel
								</Button>
								{!activeDate && (
									<Button onClick={handleDelete} className={styles.delete}>
										Delete
									</Button>
								)}
								<Button className={styles.submit} type="submit">
									{activeDate ? "Add" : "Save"}
								</Button>
							</div>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}
