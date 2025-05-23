import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


// Custom styled components using the color palette
const StyledAppBar = styled(AppBar)(({ theme }) => ({
	backgroundColor: '#27187E', // Dark blue from palette
	boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
	color: '#F1F2F6', // Light gray from palette
	'&:hover': {
		backgroundColor: '#758BFD', // Medium blue from palette
	},
}));

const Header = () => {
	const navigate= useNavigate();
	const handleLogin= () =>{
		navigate('/login');
	}
	const handleHome= () =>{
		navigate('/');
	}
	return (
		<StyledAppBar position="static">
				<Toolbar disableGutters>
					<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, }}>
						<Typography
							variant="h6"
							component="div"
							sx={{
								color: '#F1F2F6',
								fontWeight: 'bold',
								letterSpacing: '0.5px',
								fontSize: '30px',
								marginLeft: 2
							}}
						>
							Train Ticket Distributor
						</Typography>
					</Box>

					<Box sx={{ display: 'flex', gap: 2, marginRight: 2 }}>
						<StyledButton onClick={handleHome}>Home</StyledButton>
						<StyledButton>About</StyledButton>
						<StyledButton variant="contained"
							sx={{
								backgroundColor: '#FF8600',
								'&:hover': {
									backgroundColor: '#E67A00',
								}
							}}
							onClick={handleLogin}
						>
							Admin Login
						</StyledButton>
					</Box>
				</Toolbar>
		</StyledAppBar>
	);
};

export default Header;
