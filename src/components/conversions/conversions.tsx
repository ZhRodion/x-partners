import { Suspense } from 'react'
import ConversationDashboard from '../conversation-dashboard/conversation-dashboard'
import ConversationLoader from '../conversation-loader/conversation-loader'
import ConversationSearch from '../conversation-search/conversation-search'
import styles from './conversions.module.scss'

export default function Conversions() {
	return (
		<section className={styles.conversions}>
			<div
				className={`${'container-wrapper'} ${styles.conversions__container}`}
			>
				<h2 className='visually-hidden'>Conversation Section</h2>
				<div className={styles.conversions__searchWrapper}>
					<ConversationSearch />
					<Suspense fallback={<ConversationLoader />}>
						<ConversationDashboard />
					</Suspense>
				</div>
			</div>
		</section>
	)
}
