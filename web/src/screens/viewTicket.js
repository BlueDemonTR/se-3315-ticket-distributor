import React, { useState } from 'react'
import { Col, Row, Spinner2, Text } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Api from '../lib/Api'
import { addMinutes, format } from 'date-fns'
import { Button, Container} from '@mui/material'

const ViewTicket = ({ hasCancel,mappedTicket}) => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [ticket, setTicket] = useState(null)

	useEffect(() => {
		if(mappedTicket){
			setTicket(mappedTicket);
		}
		else fetch()
		
	}, [])

	async function fetch() {
		setLoading(true)

		const res = await Api.post('getTicket', { ticketId: id })
		setLoading(false)
		if(!res) return

		setTicket(res.ticket)
	}	
	
	async function cancelTicket() {
		const res = await Api.post('admin/cancelTicket', { ticketId: id })
		if(!res) return

		navigate('/');

	}

	if(loading) return (
		<Col wid='100%' ht='700px' centerAll noFlex gap='16px'>
			<Spinner2 />
		</Col>
	)

	if(!ticket) return null

	const seat = ticket.seat
	const owner = ticket.owner
	const train = seat.train
	const { from, to } = train
	const arrival = addMinutes(new Date(train.departure), train.duration)

	return (
			


			
			<Container sx={{marginBottom:5, border:'1px solid black'}}>
				<Row gap='16px'>
					<Col>
						<Text bold b1>From:</Text>
						<Text>{from.name}</Text>

						<Row gap='4px' center start>
							<Text bold c1>Departure:</Text>
							<Text>{format(train.departure, 'd MMM y hh:mm')}</Text>
						</Row>
					</Col>

					<Col>
						<Text bold b1>To:</Text>
						<Text>{to.name}</Text>

						<Row gap='4px' center start>
							<Text bold c1>Arrival:</Text>
							<Text>{format(arrival, 'd MMM y hh:mm')}</Text>
						</Row>
					</Col>
					<Col>
					{hasCancel && (
				<Button
					sx={{
						background: 'red',
						color: 'white',
						padding: 4,
					}} 
					onClick={cancelTicket}
				>
					Cancel Ticket
				</Button>)}

					</Col>

				</Row>

				<Row gap='8px' start>
					<Row gap='4px' centerAll>
						<Text bold c1>Owner:</Text>

						<Text>{owner.name}</Text>
					</Row>
					{owner.phoneNumber && (
						<Row gap='4px' centerAll>
							<Text bold c1>Phone Number:</Text>

							<Text>{owner.phoneNumber}</Text>
						</Row>
					)}
					{owner.email && (
						<Row gap='4px' centerAll>
							<Text bold c1>Email:</Text>

							<Text>{owner.email}</Text>
						</Row>
					)}
				</Row>
			
			
			
			</Container>

	)
}

export default ViewTicket