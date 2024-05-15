import styles from './footer-menu.module.scss'

type FooterMenuProps = {
	id: number
	href: string
	linkText: string
}

const footerMenuData: FooterMenuProps[] = [
	{
		id: 1,
		href: '#',
		linkText: 'API',
	},
	{
		id: 2,
		href: '#',
		linkText: 'menu',
	},
	{
		id: 3,
		href: '#',
		linkText: 'menu',
	},
	{
		id: 4,
		href: '#',
		linkText: 'menu',
	},
	{
		id: 5,
		href: '#',
		linkText: 'menu',
	},
]

export default function FooterMenu() {
	return (
		<ul className={styles.footerMenu}>
			{footerMenuData.map(({ id, href, linkText }) => (
				<li className={styles.footerMenu__item} key={id}>
					<a className={styles.footerMenu__link} href={href}>
						{linkText}
					</a>
				</li>
			))}
		</ul>
	)
}
