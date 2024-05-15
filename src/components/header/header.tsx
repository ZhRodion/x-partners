import UserProfile from '../user-profile/user-profile'
import styles from './header.module.scss'

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={`${'container-wrapper'} ${styles.header__container}`}>
				<a className={styles.header__logoLink} href='#'>
					<img
						className={styles.header__logo}
						src='./svgs/logo.svg'
						alt='Header logo'
					/>
				</a>
				<UserProfile username={'name@x-parters.com'} />
			</div>
		</header>
	)
}
