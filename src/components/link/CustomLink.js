import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function CustomLink({
	children,
	to,
	activeClassName,
	className,
	...props
}) {
	let resolved = useResolvedPath(to)
	let match = useMatch({ path: resolved.pathname, end: true })

	return (
		<div>
			<Link className={match ? activeClassName : className} to={to} {...props}>
				{children}
			</Link>
		</div>
	)
}
