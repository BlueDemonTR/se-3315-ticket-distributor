import React, { useState } from 'react'
import Col from '../components/Col'
import { Clickable, Row, Spinner2, Text } from '../components'
import { useDispatch } from 'react-redux'
import Api from '../lib/Api'

const AddStation = ({  }) => {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	async function createStation() {
		setName('')
		
		if(!name) return
		
		setLoading(true)

		const res = await Api.post('admin/createStation', { name });
		setLoading(false)
		
		if(!res) return

		dispatch({
				type: 'ADD_STATION',
				payload: res.station
		})
	}

	return (
		<Row pad='12px' hasBorder='2px solid #000000' hasRadius='10px' gap='8px' center>
			{loading ? (
				<Spinner2 />
			) : (
				<React.Fragment>
					<input value={name} onChange={(e) => setName(e.target.value)} placeholder='Station Name'/>

					<Clickable onClick={createStation}>
						<Col pad='4px 6px' hasRadius='10px' bg='green'>
							<Text col='white'>
								+
							</Text>
						</Col>

					</Clickable>
				</React.Fragment>
			)}
		</Row>
	)
}

export default AddStation