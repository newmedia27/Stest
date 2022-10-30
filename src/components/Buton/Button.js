import classNames from 'classnames'
import styles from './style.module.sass'

export default function Button({children,className,...props}){
    return <button  className={classNames(styles.btn, className)} {...props}>{children}</button>
}

Button.defaultProps = {
    type: 'button'
}