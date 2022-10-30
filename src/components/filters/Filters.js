import FilterItem from "../filter/"
import { useSearchParams } from "react-router-dom"
import styles from "./style.module.sass"
import { filters } from "./utils"

export default function Filters() {
	const [params, setParams] = useSearchParams()
	const handleChange = ({ target: { name } }) => {
		if (params.get(name)) {
			params.delete(name)
		} else {
			params.set(name, true)
		}
		setParams(params)
	}

	return (
		<ul className={styles.wrapper}>
			{Object.keys(filters).map((e) => {
				return (
					<FilterItem
						key={e}
						handleChange={handleChange}
						name={e}
						id={e}
						checked={!!params.has(e)}
						label={filters[e].text}
					/>
				)
			})}
		</ul>
	)
}
