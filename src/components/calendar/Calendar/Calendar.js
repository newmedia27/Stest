import * as calendar from "./utils"
import styles from "./style.module.sass"
import classNames from "classnames"
import { format } from "date-fns"
import CalendarBtn from "../CalendarBtn/CalendarBtn"
import { useMemo } from "react"

const weeksDays = calendar.getWeekDays()

export default function Calendar({currentDate}) {
    const items = useMemo(()=>calendar.getMonthData(
        currentDate.getFullYear(),
        currentDate.getMonth()
    ),[currentDate])

	return (
        <div className={styles.wrapper}>
            <h2>{format(currentDate,'LLLL')}</h2>
       
		<div className={styles.container}>
			<div className={classNames(styles.row, styles.title)}>
				{weeksDays.map((e) => (
					<div className={styles.col} key={e.valueOf()}>
						{e && format(e, "iii")}
					</div>
				))}
			</div>
			{items.map((item, i) => (
				<div className={styles.row} key={i}>
					{item.map(
						(e) =>
							e && (
								<CalendarBtn
									active={
										e &&
										e.getMonth().valueOf() === currentDate.getMonth().valueOf()
									}
									key={e.valueOf()}
									value={e}
								>
									{format(e, "d")}
								</CalendarBtn>
							)
					)}
				</div>
			))}
		</div> </div>
	)
}


