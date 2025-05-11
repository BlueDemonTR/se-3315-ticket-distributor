import React, { useState } from 'react'
import { Col, Text } from '../components'
import { useNavigate } from 'react-router-dom'

const Homepage = ({  }) => {
	const navigate = useNavigate()

	return (
		<Col>
			<Text>
				burası homepage
			</Text>

			<button onClick={() => navigate('login')}>
				login
			</button>
		</Col>

	)
}

export default Homepage