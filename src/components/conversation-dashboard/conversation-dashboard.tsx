import { useEffect, useState } from 'react'
import fetchingData from '../../api'
import { useSearchStore } from '../../store/search-store'
import styles from './conversation-dashboard.module.scss'

export default function ConversationDashboard() {
	const [conversions, setConversionsArray] = useState<any[]>([])
	const [error, setError] = useState<string | null>(null)
	const { searchTerm } = useSearchStore()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchingData()
				console.log(data)
				const { conversions } = data
				setConversionsArray(conversions)
			} catch (error) {
				setError((error as Error).message)
			}
		}

		fetchData()
	}, [])

	const filteredConversions = conversions.filter(conversion =>
		conversion.id.includes(searchTerm)
	)

	return (
		<div>
			{error && <p>{error}</p>}
			<ul className={styles.dashboard}>
				{filteredConversions.map(conversion => (
					<li className={styles.dashboard__item} key={conversion.id}>
						<p>ID: {conversion.id}</p>
						<p>Date: {conversion.date}</p>
						<p>Offer: {conversion.offer}</p>
						<p>Geo: {conversion.geo.name}</p>
						<p>Device OS: {conversion.device.os}</p>
						<p>Status: {conversion.status}</p>
						<p>
							Income: {conversion.income.amount} {conversion.income.currency}
						</p>
						<p>Goal: {conversion.goal}</p>
						<p>Sub1: {conversion.sub1}</p>
						<p>Sub2: {conversion.sub2}</p>
						<p>Sub3: {conversion.sub3}</p>
						<p>Sub4: {conversion.sub4}</p>
						<p>Sub5: {conversion.sub5}</p>
						<p>Sub6: {conversion.sub6}</p>
						<p>Sub7: {conversion.sub7}</p>
						<p>Sub8: {conversion.sub8}</p>
						<p>User Agent: {conversion.user_agent}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
