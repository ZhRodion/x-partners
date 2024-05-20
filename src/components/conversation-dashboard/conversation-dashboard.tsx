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
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import fetchingData from '../../api'
import { useSearchStore } from '../../store/search-store'
import { columns } from '../../utils/array'
import { formatDate, getValue } from '../../utils/functions'
import ConversationLoader from '../conversation-loader/conversation-loader'
import styles from './conversation-dashboard.module.scss'

const theme = createTheme({
	components: {
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: 'white',
					color: 'black',
					fontSize: '12',
					padding: '14px',
					boxShadow: '0 4px 20px 0 rgba(93, 67, 255, 0.12)',
				},
				arrow: {
					color: 'white',
				},
			},
		},
	},
})

const renderCell = (key: string, value: any, rowKey: string) => {
	const cellKey = `${rowKey}_${key}`
	switch (key) {
		case 'date':
			return <TableCell key={cellKey}>{formatDate(value)}</TableCell>
		case 'user_agent':
			return (
				<TableCell key={cellKey}>
					<ThemeProvider theme={theme}>
						<Tooltip title={value} arrow={true} placement='top'>
							<IconButton>
								<img src='./svgs/conversations/info.svg' alt='Info Icon' />
							</IconButton>
						</Tooltip>
					</ThemeProvider>
				</TableCell>
			)
		case 'income':
			return (
				<TableCell
					key={cellKey}
				>{`${value.amount} ${value.currency}`}</TableCell>
			)
		case 'comment':
			return <TableCell key={cellKey}>{value ? value : '-'}</TableCell>
		default:
			return <TableCell key={cellKey}>{value}</TableCell>
	}
}

export default function ConversationDashboard() {
	const [conversions, setConversionsArray] = useState<any[]>([])
	const [error, setError] = useState<string | null>(null)
	const { searchTerm } = useSearchStore()
	const loading = useSearchStore((state: { loading: any }) => state.loading)

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
						{filteredConversions.map((conversion, index) => {
							const rowKey = `${uuidv4()}_${conversion.id}_${conversion.sub2}`
							return (
								<TableRow
									className={`${styles.table__row} ${
										index % 2 === 0 ? '' : styles.bgRow
									}`}
									key={rowKey}
								>
									{columns.map(column =>
										renderCell(
											column.key,
											getValue(conversion, column.key),
											rowKey
										)
									)}
								</TableRow>
							)
						})}
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
