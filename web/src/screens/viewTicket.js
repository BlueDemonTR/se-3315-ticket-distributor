import React, { useState } from 'react'
import { Spinner2 } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Api from '../lib/Api'
import { addMinutes, format } from 'date-fns'
import {
	IconButton,
	Container,
	Paper,
	Typography,
	Box,
	Stack,
	Divider
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'

const ViewTicket = ({ hasCancel, mappedTicket, onCancel = () => null }) => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [ticket, setTicket] = useState(null)

	useEffect(() => {
		if (mappedTicket) {
			setTicket(mappedTicket);
		}
		else fetch()
	}, [])

	async function fetch() {
		setLoading(true)
		const res = await Api.post('getTicket', { ticketId: id })
		setLoading(false)
		if (!res) return
		setTicket(res.ticket)
	}

	async function cancelTicket() {
		const res = await Api.post('admin/cancelTicket', { ticketId: mappedTicket._id })
		if (!res) return
		navigate('/');
		onCancel();
	}

	if (loading) return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
			<Spinner2 />
		</Box>
	)

	if (!ticket) return null

	const seat = ticket.seat
	const owner = ticket.owner
	const train = seat.train
	const { from, to } = train
	const arrival = addMinutes(new Date(train.departure), train.duration)

	return (
		<Container
			disableGutters
			sx={{
				py: 1,
				display: 'flex',
				justifyContent: 'center',
				width: '100%'
			}}
		>
			<Paper
				elevation={2}
				sx={{
					p: 1.5,
					borderRadius: 1,
					width: hasCancel ? '100%' : 'fit-content',
					minWidth: hasCancel ? '100%' : 600,
					minHeight: 110,
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%">

					<Stack direction="row" spacing={4} alignItems="center">

						<Box>
							<Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, ml: 0.5 }}>
								From
							</Typography>
							<Stack direction="row" spacing={1} alignItems="center">
								<LocationOnIcon color="primary" fontSize="small" />
								<Typography variant="subtitle1">
									{from.name}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<AccessTimeIcon color="action" fontSize="small" />
								<Typography variant="body2">
									{format(train.departure, 'd MMM y hh:mm')}
								</Typography>
							</Stack>
						</Box>

						<Divider orientation="vertical" flexItem />

						<Box>
							<Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
								To
							</Typography>
							<Stack direction="row" spacing={1} alignItems="center">
								<LocationOnIcon color="primary" fontSize="small" />
								<Typography variant="subtitle1">
									{to.name}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<AccessTimeIcon color="action" fontSize="small" />
								<Typography variant="body2">
									{format(arrival, 'd MMM y hh:mm')}
								</Typography>
							</Stack>
						</Box>

						<Divider orientation="vertical" flexItem />

						<Box sx={{ minWidth: 120 }}>
							<Stack>
								<Stack direction="row" spacing={1} alignItems="center">
									<PersonIcon color="primary" fontSize="small" />
									<Typography variant="subtitle1">
										{owner.name}
									</Typography>
								</Stack>
								{owner.phoneNumber ? (
									<Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
										<PhoneIcon color="primary" fontSize="small" />
										<Typography variant="body2">
											{owner.phoneNumber}
										</Typography>
									</Stack>
								) : (
									<Box sx={{ height: 24 }} />
								)}
								{owner.email ? (
									<Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
										<EmailIcon color="primary" fontSize="small" />
										<Typography variant="body2">
											{owner.email}
										</Typography>
									</Stack>
								) : (
									<Box sx={{ height: 24 }} />
								)}
							</Stack>
						</Box>
					</Stack>

					{hasCancel && (
						<IconButton
							size='medium'
							onClick={cancelTicket}
							sx={{ ml: 'auto', }}
						>
							🗑️
						</IconButton>
					)}
				</Stack>
			</Paper>
		</Container>
	)
}

export default ViewTicket