import classNames from "classnames"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

import styles from "./style.module.sass"

export default function FilterIndicator({ active, indicators }) {
	
	return (
		<ul className={styles.wrapper}>
			{active &&
				indicators.map((e) => <Indicator key={e} className={styles[e]} />)}
		</ul>
	)
}

function Indicator({ className }) {
	return <li className={classNames(styles.indicator, className)} />
}
