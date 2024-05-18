import './App.css'
import Conversions from './components/conversions/conversions'
import Graphic from './components/graphic/graphic'
import Layout from './components/layout/layout'

function App() {
	return (
		<>
			<Layout>
				<Graphic />
				<Conversions />
			</Layout>
		</>
	)
}

export default App
