import styles from "./style.module.sass"

export default function AppLayout({children}) {
	return <div className={styles.app}>{children}</div>
}
