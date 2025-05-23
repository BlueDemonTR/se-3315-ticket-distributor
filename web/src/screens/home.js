import React, { useState,useEffect } from 'react';
import {
	Box,
	Container,
	Typography,
	Button,
	Grid,
	TextField,
	MenuItem,
	Paper,
	Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

// Renk paleti
const palette = {
	primary: '#27187E',
	secondary: '#758BFD',
	accent: '#FF8600',
	background: '#F1F2F6',
	light: '#AEB8FE',
};

const stations = [
	{ value: 'istanbul', label: 'İstanbul' },
	{ value: 'ankara', label: 'Ankara' },
	{ value: 'izmir', label: 'İzmir' },
	{ value: 'eskişehir', label: 'Eskişehir' },
	{ value: 'konya', label: 'Konya' },
];

const mockTrains = [
	{
		id: 1,
		name: 'Yüksek Hızlı Tren',
		departure: '08:00',
		arrival: '12:00',
		seats: 34,
		from: 'istanbul',
		to: 'ankara',
	},
	{
		id: 2,
		name: 'Ekspres',
		departure: '10:30',
		arrival: '16:00',
		seats: 12,
		from: 'istanbul',
		to: 'ankara',
	},
	{
		id: 3,
		name: 'Bölgesel',
		departure: '14:00',
		arrival: '20:00',
		seats: 5,
		from: 'izmir',
		to: 'ankara',
	},
];

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: 20,
	background: '#fff',
	boxShadow: '0 4px 24px 0 rgba(39,24,126,0.08)',
	marginTop: theme.spacing(6),
}));

const StyledButton = styled(Button)(({ theme }) => ({
	backgroundColor: palette.accent,
	color: '#fff',
	fontWeight: 'bold',
	fontSize: '1.1rem',
	padding: '16px 32px',
	borderRadius: 16,
	boxShadow: '0 2px 8px 0 rgba(255,134,0,0.10)',
	'&:hover': {
		backgroundColor: '#e67a00',
	},
}));

const TrainCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	borderRadius: 16,
	marginTop: theme.spacing(2),
	background: palette.background,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	boxShadow: '0 2px 8px 0 rgba(39,24,126,0.08)',
}));

const HomePage = () => {
	const [from, setFrom] = useState('istanbul');
	const [to, setTo] = useState('ankara');
	const [date, setDate] = useState(new Date());
	const [showTrains, setShowTrains] = useState(false);
	const [filteredTrains, setFilteredTrains] = useState([]);
	const navigate = useNavigate();

	
	useEffect(() => {
		setShowTrains(false);
	}, [from, to, date]);

	
	const handleSearch = () => {
		const results = mockTrains.filter(
			(train) => train.from === from && train.to === to
		);
		setFilteredTrains(results);
		setShowTrains(true);
	};

	const handleBuyTicket = (train) => {
		navigate('/buy-ticket', { state: { train } });
	};

	return (
		<Container maxWidth="md">
			<StyledPaper>
				<Box justifyContent={'space-between'} display={'flex'} alignItems={'center'} gap={2}>
					<Box flex={2}>
						<Typography variant="subtitle2" sx={{ color: palette.primary, fontWeight: 600, mb: 1 }}>
							From
						</Typography>
						<TextField
							select
							fullWidth
							value={from}
							onChange={e => setFrom(e.target.value)}
							variant="outlined"
							sx={{ background: palette.background, borderRadius: 2, fontSize: 10 }}
						>
							{stations.map(option => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Box>
					<Box flex={2}>
						<Typography variant="subtitle2" sx={{ color: palette.primary, fontWeight: 600, mb: 1 }}>
							To
						</Typography>
						<TextField
							select
							fullWidth
							value={to}
							onChange={e => setTo(e.target.value)}
							variant="outlined"
							sx={{ background: palette.background, borderRadius: 2, fontSize: 10 }}
						>
							{stations.map(option => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Box>
					<Box>
						<Typography variant="subtitle2" sx={{ color: palette.primary, fontWeight: 600, mb: 1 }}>
							Departure Date
						</Typography>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								value={date}
								onChange={setDate}
								renderInput={(params) => (
									<TextField {...params} fullWidth sx={{ background: palette.background, borderRadius: 2 }} />
								)}
							/>
						</LocalizationProvider>
					</Box>
					<Box alignSelf={'flex-end'}>
						<StyledButton onClick={handleSearch} fullWidth>
							Search Train
						</StyledButton>
					</Box>
				</Box>
			</StyledPaper>

			{/* Trenler Listesi */}
			{showTrains && (
				<Box mt={4}>
					{filteredTrains.length === 0 ? (
						<Typography sx={{ color: palette.primary, textAlign: 'center', mt: 2 }}>
							No train has been found for the selected destination.
						</Typography>
					) : (
						filteredTrains.map((train) => (
							<TrainCard key={train.id}>
								<Box>
									<Typography variant="h6" sx={{ color: palette.primary, fontWeight: 700 }}>
										{train.name}
									</Typography>
									<Typography sx={{ color: palette.secondary }}>
										Departure: <b>{train.departure}</b> &nbsp;|&nbsp; Arrival: <b>{train.arrival}</b>
									</Typography>
								</Box>
								<Box display="flex" alignItems="center" gap={2}>
									<Typography sx={{ color: palette.accent, fontWeight: 600 }}>
										Seats Left: {train.seats}
									</Typography>
									<StyledButton onClick={() => handleBuyTicket(train)} sx={{ minWidth: 120, ml: 2 }}>
										Buy Ticket
									</StyledButton>
								</Box>
							</TrainCard>
						))
					)}
				</Box>
			)}
		</Container>
	);
};

export default HomePage;