import { LineChart } from '@mui/x-charts'
import { axisClasses } from '@mui/x-charts/ChartsAxis'
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid'
import { useEffect, useState } from 'react'
import fetchingData from '../../api'
import styles from './graphic-visual.module.scss'

export default function GraphicVisual() {
	const [error, setError] = useState<string | null>(null)
	const [statistics, setStatisticsArray] = useState<any[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchingData()
				const { statistics } = data
				setStatisticsArray(statistics)
			} catch (error) {
				setError((error as Error).message)
			}
		}

		fetchData()
	}, [])

	const formattedDates = statistics.map(d => {
		const date = new Date(d.date)
		return date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
		})
	})

	const clicks = statistics.map(d => d.clicks)
	const conversions = statistics.map(d => d.conversions)
	const amount = statistics.map(d => d.amount)

	return (
		<div className={styles.graphic}>
			<div className={styles.graphic__visual}>
				<p className={styles.graphic__heading}>
					Статистика за последние 10 дней
				</p>
				<LineChart
					xAxis={[
						{
							id: 'date',
							data: [...formattedDates],
							scaleType: 'point',
						},
					]}
					slotProps={{
						legend: {
							direction: 'row',
							position: { vertical: 'bottom', horizontal: 'middle' },
							markGap: 10,
							itemGap: 69,
							padding: -31,
							labelStyle: {
								fontSize: 12,
								fill: '#A7A7A7',
								lineHeight: '133%',
								fontWeight: '500',
							},
						},
					}}
					series={[
						{
							label: 'Клики',
							data: [...clicks],
							color: '#E127FF',
						},
						{
							label: 'Конверсии',
							data: [...conversions],
							color: '#5D43FF',
						},
						{
							label: 'К выплате',
							data: [...amount],
							color: '#28D8FF',
						},
					]}
					height={311}
					grid={{ vertical: true, horizontal: true }}
					sx={{
						[`& .${axisClasses.left} .${axisClasses.label}`]: {
							transform: 'translateX(-10px)',
						},
						[`& .${chartsGridClasses.line}`]: {
							strokeDasharray: '5 2',
							strokeWidth: 2,
						},
						[`& .MuiChartsLegend-series`]: {
							display: 'flex',
							gap: '10px',
						},
						'& .MuiChartsLegend-mark': {
							clipPath: 'circle(50%)',
						},
					}}
				/>
			</div>
		</div>
	)
}
