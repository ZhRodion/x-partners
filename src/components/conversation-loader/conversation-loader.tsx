import styles from './conversation-loader.module.scss'

export default function ConversationLoader() {
	return (
		<div className={styles.conversationLoader}>
			<img
				className={styles.conversationLoader__img}
				src='./svgs/conversations/conversation-loader.svg'
				alt='Loading Icon'
			/>
		</div>
	)
}
