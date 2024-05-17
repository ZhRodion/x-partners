import axios from 'axios'

const fetchingData = async () => {
	const username = 'xp'
	const password = 'xp'
	const token = btoa(`${username}:${password}`)

	try {
		const response = await axios.get(
			'https://admin.x-partners.com/api/test/data/',
			{
				headers: {
					Authorization: `Basic ${token}`,
				},
			}
		)
		return response.data
	} catch (error) {
		throw new Error(`Error fetching data ${error}`)
	}
}

export default fetchingData
