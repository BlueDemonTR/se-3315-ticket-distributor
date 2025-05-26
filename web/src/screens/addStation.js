import React, { useState } from 'react'
import Col from '../components/Col'
import { Clickable, Row, Spinner2, Text } from '../components'
import { Box, TextField, Button, CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'
import Api from '../lib/Api'

const palette = {
	primary: '#27187E',
	secondary: '#758BFD',
	accent: '#FF8600',
	background: '#F1F2F6',
	light: '#AEB8FE',
};

const AddStation = () => {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	async function createStation() {
		if (!name) return

		setLoading(true)
		const res = await Api.post('admin/createStation', { name });
		setLoading(false)

		if (!res) return

		dispatch({
			type: 'ADD_STATION',
			payload: res.station
		})
		setName('')
	}

	return (
		<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1}}>
			{loading ? (
				<Spinner2 />
			) : (
				<>
					<TextField
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Station Name'
						size="small"
						sx={{
							background: palette.background,
							borderRadius: 2,
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: 'transparent',
								},
								'&:hover fieldset': {
									borderColor: 'transparent',
								},
								'&.Mui-focused fieldset': {
									borderColor: palette.accent,
								},
							},
						}}
					/>
					<Button
						onClick={createStation}
						variant="contained"
						sx={{
							backgroundColor: palette.accent,
							color: '#fff',
							minWidth: '40px',
							width: '40px',
							height: '40px',
							p: 0,
							'&:hover': {
								backgroundColor: '#e67a00',
							},
						}}
					>
						+
					</Button>
				</>
			)}
		</Box>
	)
}

export default AddStation