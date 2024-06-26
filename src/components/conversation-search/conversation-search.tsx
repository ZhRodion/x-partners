import React, { useEffect, useState } from 'react'
import { useSearchStore } from '../../store/search-store'
import styles from './conversation-search.module.scss'

export default function ConversationSearch() {
	const { searchTerm, setSearchTerm } = useSearchStore()
	const [debouncedValue, setDebouncedValue] = useState(searchTerm)
	const setLoading = useSearchStore(state => state.setLoading)

	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchTerm(debouncedValue)
		}, 500)

		return () => {
			clearTimeout(timer)
		}
	}, [debouncedValue, setSearchTerm])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setLoading(true)
		if (/^[a-zA-Z0-9]*$/.test(value)) {
			setDebouncedValue(value)
			setTimeout(() => {
				setLoading(false)
			}, 2000)
		}
	}

	return (
		<>
			<label className={styles.searchConversation}>
				<input
					className={styles.searchConversation__input}
					type='text'
					placeholder='ID'
					value={debouncedValue}
					onChange={handleInputChange}
				/>
				<img
					className={styles.searchConversation__icon}
					src='./svgs/conversations/search.svg'
					alt='Search Icon'
				/>
			</label>
		</>
	)
}
