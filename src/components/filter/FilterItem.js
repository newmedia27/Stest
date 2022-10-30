import classNames from "classnames"
import PropTypes from "prop-types"
import { Children, cloneElement } from "react"
import styles from "./style.module.sass"

export default function FilterItem({
	children,
	handleChange,
	checked,
	id,
	name,
	label,
	wrapperClassName,
	component: Component,
	className,
}) {
	const htmlFor = id ? id : `${new Date()}-checkbox`
	const activeClassName = { [styles[name]]: name }
	return (
		<Component className={classNames(styles.item__wrapper, wrapperClassName)}>
			{children &&
				cloneElement(children, {
					...children.props,
					className: classNames(children.props.className, activeClassName),
				})}
			<div className={classNames(styles.item, className, activeClassName)}>
				<input
					id={htmlFor}
					type="checkbox"
					checked={checked}
					onChange={handleChange}
					name={name}
				/>
				<label htmlFor={htmlFor}>{label}</label>
			</div>
		</Component>
	)
}

FilterItem.propTypes = {
	children: PropTypes.node,
	handleChange: PropTypes.func,
	checked: PropTypes.bool,
	id: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.node.isRequired,
	wrapperClassName: PropTypes.string,
	component: PropTypes.string,
	className: PropTypes.string,
}

FilterItem.defaultProps = {
	children: null,
	handleChange: () => {},
	checked: false,
	id: "",
	wrapperClassName: "",
	component: "li",
	className: "",
}

export function FilterItemWrapper({ children, component, ...props }) {
	return (
		<FilterItem component={component} {...props}>
			{children}
		</FilterItem>
	)
}

FilterItemWrapper.propTypes = {
	children: PropTypes.node.isRequired,
	component: PropTypes.string,
}

FilterItemWrapper.defaultProps = {
	component: "div",
}
