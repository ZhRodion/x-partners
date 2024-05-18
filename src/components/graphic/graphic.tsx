import GraphicVisual from '../graphic-visual/graphic-visual'
import styles from './graphic.module.scss'

export default function Graphic() {
	return (
		<section className={`${'graphic'} ${styles.graphicSection}`}>
			<div className='container-wrapper'>
				<h2 className={styles.graphicSection__title}>Dashboard</h2>
				<GraphicVisual />
			</div>
		</section>
	)
}
