import React, { useState } from 'react';
import {
	Box,
	Typography,
	Container,
	TextField,
	Button,
	Paper,
	Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Api from '../lib/Api';
import { useDispatch } from 'react-redux'
import storage from '../lib/storage';

const palette = {
	primary: '#27187E',
	secondary: '#758BFD',
	accent: '#FF8600',
	background: '#F1F2F6',
	light: '#AEB8FE',
};

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	borderRadius: 20,
	background: '#fff',
	marginTop: theme.spacing(8),
	boxShadow: '0 4px 24px 0 rgba(39,24,126,0.08)',
	maxWidth: 400,
	marginLeft: 'auto',
	marginRight: 'auto',
}));

const StyledButton = styled(Button)(({ theme }) => ({
	backgroundColor: palette.accent,
	color: '#fff',
	fontWeight: 'bold',
	fontSize: '1.1rem',
	padding: '12px 32px',
	borderRadius: 16,
	boxShadow: '0 2px 8px 0 rgba(255,134,0,0.10)',
	'&:hover': {
		backgroundColor: '#e67a00',
	},
}));

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	// DISPATCH INITIALIZELA
	const dispatch = useDispatch();

	const handleSubmit = async () => {

		// SUNUCUYA REQUEST AT
		const res = await Api.post('adminLogin', { username, password })
		
		// EĞER CEVAP GELMEZSE HATA VER
		if(!res) return setError(true);
		// EĞER CEVAP GELİRSE HATAYI KALDIR
		setError(false);

		// PLAYER'I REDUX'A KOY
		dispatch({
			type: 'SET_USER',
			payload: res.user
		})

		// TOKENİ STORAGE'A KOY
		await storage.setItem('token', res.token)
		
		navigate('/');
	};

	return (
		<Container>
			<StyledPaper>
				<Typography variant="h5" sx={{ color: palette.primary, fontWeight: 700, mb: 3, textAlign: 'center' }}>
					Admin Login
				</Typography>
				{error && <Alert severity="error" sx={{ mb: 2 }}>Name or Password is incorrect</Alert>}
				<Box component="form" onSubmit={handleSubmit}>
					<TextField
						label="Username"
						value={username}
						onChange={e => setUsername(e.target.value)}
						fullWidth
						required
						sx={{ mb: 2, background: palette.background, borderRadius: 2 }}
					/>
					<TextField
						label="Password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						fullWidth
						required
						sx={{ mb: 3, background: palette.background, borderRadius: 2 }}
					/>
					<StyledButton onClick={handleSubmit} fullWidth>
						Login
					</StyledButton>
				</Box>
			</StyledPaper>
		</Container>
	);
};

export default Login;