import React from "react"
import { Link } from "react-router-dom"
import styles from "./style.module.sass"

const Footer = () => {
	return (
		<footer>
			<div className={styles.logo}>
				<Link to="/">logo</Link>
			</div>
			<ul className={styles.nav}>
				<li>
					<Link>main</Link>
				</li>
				<li>
					<Link>events</Link>
				</li>
				<li>
					<Link>calendar</Link>
				</li>
				<li>
					<Link>faq</Link>
				</li>
			</ul>
			<div className={styles.copy}>&copy; 2022 All rights reserved</div>
		</footer>
	)
}

export default Footer
