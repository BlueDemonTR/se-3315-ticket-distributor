import React, { useState } from 'react'
import Col from '../components/Col'
import { Clickable, Row, Text } from '../components'
import { useDispatch } from 'react-redux'
import Api from '../lib/Api'

const AddStation = ({  }) => {
	const [name, setName] = useState('')
	const dispatch = useDispatch()

	async function createStation() {
		setName('')

		const res = await Api.post('admin/createStation', { name });
		if(!res) return

		dispatch({
				type: 'ADD_STATION',
				payload: res.station
		})
	}

	return (
		<Row pad='12px' hasBorder='2px solid #000000' hasRadius='10px' gap='8px' center>
			<input value={name} onChange={(e) => setName(e.target.value)} placeholder='Station Name'/>

			<Clickable onClick={createStation}>
				<Col pad='4px 6px' hasRadius='10px' bg='green'>
					<Text col='white'>
						+
					</Text>
				</Col>

			</Clickable>
		</Row>
	)
}

export default AddStation