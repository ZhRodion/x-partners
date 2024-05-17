import InfoIcon from '@mui/icons-material/Info'
import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import fetchingData from '../../api'
import { useSearchStore } from '../../store/search-store'
import ConversationLoader from '../conversation-loader/conversation-loader'
import styles from './conversation-dashboard.module.scss'

const formatDate = (dateString: any) => {
	const date = new Date(dateString)
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')
	return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}

const renderCell = (key: string, value: any) => {
	switch (key) {
		case 'date':
			return <TableCell>{formatDate(value)}</TableCell>
		case 'user_agent':
			return (
				<TableCell>
					<Tooltip title={value}>
						<IconButton>
							<InfoIcon />
						</IconButton>
					</Tooltip>
				</TableCell>
			)
		case 'income':
			return <TableCell>{`${value.amount} ${value.currency}`}</TableCell>
		case 'comment':
			return <TableCell>{value ? value : '-'}</TableCell>
		default:
			return <TableCell>{value}</TableCell>
	}
}

export default function ConversationDashboard() {
	const [conversions, setConversionsArray] = useState<any[]>([])
	const [error, setError] = useState<string | null>(null)
	const { searchTerm } = useSearchStore()
	const loading = useSearchStore(state => state.loading)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchingData()
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

	const columns = [
		{ title: 'Дата создания', key: 'date' },
		{ title: 'Оффер', key: 'offer' },
		{ title: 'Гео/IP', key: 'geo.name' },
		{ title: 'Устройство', key: 'device.os' },
		{ title: 'Статус', key: 'status' },
		{ title: 'Доход', key: 'income' },
		{ title: 'Название цели', key: 'goal' },
		{ title: 'sub1', key: 'sub1' },
		{ title: 'sub2', key: 'sub2' },
		{ title: 'sub3', key: 'sub3' },
		{ title: 'sub4', key: 'sub4' },
		{ title: 'sub5', key: 'sub5' },
		{ title: 'sub6', key: 'sub6' },
		{ title: 'sub7', key: 'sub7' },
		{ title: 'User Agent', key: 'user_agent' },
		{ title: 'комментарий', key: 'comment' },
		{ title: 'id', key: 'id' },
	]

	const getValue = (obj: any, path: string) => {
		if (path === 'id') {
			return parseInt(obj.id)
		}
		return path.split('.').reduce((acc, part) => acc && acc[part], obj)
	}

	return (
		<Box className={styles.tableBox}>
			{error && <Typography color='error'>{error}</Typography>}
			{loading && <ConversationLoader />}
			<TableContainer component={Paper} className={styles.tableContainer}>
				<Table className={styles.table}>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									className={styles.table__cell}
									key={`${uuidv4()}_${column.key}`}
								>
									{column.title}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody className={styles.table__body}>
						{filteredConversions.map((conversion, index) => (
							<TableRow
								className={`${styles.table__row} ${
									index % 2 === 0 ? '' : styles.bgRow
								}`}
								key={uuidv4()}
							>
								{columns.map(column =>
									renderCell(column.key, getValue(conversion, column.key))
								)}
							</TableRow>
						))}
						{filteredConversions.length === 0 && (
							<TableRow className={styles.noData}>
								<td className={styles.noData__text}>Ничего не найдено</td>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
