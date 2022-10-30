import classNames from "classnames"
import CustomLink from "../link/CustomLink"
import styles from "./style.module.sass"

const className = classNames(styles.nav__item)
const activeClassName = classNames(styles.nav__item, styles.active)

const routes = [
	{
		to: "/",
		className,
        activeClassName,
		name: "main",
	},
	{
		to: "/events",
		className,
        activeClassName,
		name: "events",
	},
	{
		to: "/calendar",
		className,
        activeClassName,
		name: "calendar",
	},
	{
		to: "/faq",
		className,
        activeClassName,
		name: "FAQ",
	},
]

export default function Header() {
	return (
		<header>
			<div className={styles.logo}>logo</div>
			<nav>
				<ul className={styles.nav}>
					{routes.map(({ name, ...props }) => (
						<li key={name}>
							<CustomLink {...props}>{name}</CustomLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}
