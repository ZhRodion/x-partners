import styles from './user-profile.module.scss'

type userProfileProps = {
	username: string
}

export default function UserProfile({ username }: userProfileProps) {
	return (
		<div className={styles.userProfile}>
			<span className={styles.userProfile__name}>{username}</span>
			<img src='./svgs/header/logout.svg' alt='Logout icon' />
		</div>
	)
}
