import FooterMenu from '../footer-menu/footer-menu'
import styles from './footer.module.scss'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={`${'container-wrapper'} ${styles.footer__container}`}>
				<div className={styles.menuWrapper}>
					<a className={styles.footer__logoLink} href='#'>
						<img
							className={styles.footer__logo}
							src='./svgs/logo.svg'
							alt='Header logo'
						/>
					</a>
					<FooterMenu />
				</div>
				<p className={styles.footer__copyrightText}>
					IT Solutions FZCO оперирует платформой x-partners и осуществляет
					взаимодействие с контрагентами платформы. IFZA Dubai – Building A2, A
					311C, Dubai, UAE Dubai United Arab Emirates
				</p>
			</div>
		</footer>
	)
}
