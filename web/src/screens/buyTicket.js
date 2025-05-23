import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    TextField,
    MenuItem,
    Button,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../lib/Api';

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
    marginTop: theme.spacing(6),
    boxShadow: '0 4px 24px 0 rgba(39,24,126,0.08)',
    maxWidth: 500,
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

const seatLayout = [
    [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
    [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
    [null, null, null, null, null, null, null, null, null, null],
    [21, 23, 25, 27, 29, 31, 33, 35, 37, 39],
    [22, 24, 26, 28, 30, 32, 34, 36, 38, 40],
];

const occupiedSeats = [2, 5, 8, 13, 17, 22, 25, 28]; // örnek dolu koltuklar

const SeatBox = styled(Box)(({ theme, selected, occupied, isEmpty }) => ({
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 4,
    fontWeight: 600,
    fontSize: 16,
    background: isEmpty
        ? 'transparent' // boş koltuk alanı
        : occupied
            ? '#FFB4A2' // dolu koltuk (kırmızımsı)
            : selected
                ? '#AEB8FE' // seçili koltuk (palet rengi)
                : '#B5E0FF', // boş koltuk (mavi)
    color: isEmpty ? 'transparent' : occupied ? '#fff' : '#27187E',
    border: isEmpty ? 'none' : selected ? '2px solid #27187E' : '1px solid #ccc',
    cursor: isEmpty || occupied ? 'default' : 'pointer',
    opacity: isEmpty ? 0 : occupied ? 0.6 : 1,
    transition: 'all 0.2s',
}));

const BuyTicket = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const train = location.state?.train;

    const [seat, setSeat] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async () => {
        if (!name) {
            setError(true);
            return;
        }
        // Backende bağlanır muhtemelen
        const res = await Api.post("buyTicket", { train, number: seat, name, email, phone })
        if (!res) return;

        navigate('/');
    };

    if (!train) {
        return (
            <Container>
                <StyledPaper>
                    <Typography color="error">Tren bilgisi bulunamadı.</Typography>
                </StyledPaper>
            </Container>
        );
    }

    return (
        <Container>
            <StyledPaper>
                <Typography variant="h5" sx={{ color: palette.primary, fontWeight: 700, mb: 2 }}>
                    Bilet Satın Al
                </Typography>
                <Typography sx={{ color: palette.secondary, mb: 2 }}>
                    {train.name} &mdash; Kalkış: <b>{train.departure}</b> | Varış: <b>{train.arrival}</b>
                </Typography>
                <Box mb={3}>
                    <Typography sx={{ color: palette.primary, fontWeight: 600, mb: 1 }}>
                        Koltuk Seçimi
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: '#F8F9FB',
                            borderRadius: 2,
                            p: 2,
                            mb: 2,
                        }}
                    >
                        {seatLayout.map((row, i) => (
                            <Box key={i} sx={{ display: 'flex', flexDirection: 'row', mb: 0.5 }}>
                                {row.map((num, j) => (
                                    <SeatBox
                                        key={`${i}-${j}`}
                                        selected={seat == num}
                                        occupied={occupiedSeats.includes(num)}
                                        isEmpty={num === null}
                                        onClick={() => {
                                            if (num !== null && !occupiedSeats.includes(num)) setSeat(num);
                                        }}
                                    >
                                        {num}
                                    </SeatBox>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="İsim Soyisim"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                        required
                        error={error && !name}
                        helperText={error && !name ? 'İsim zorunludur' : ''}
                        sx={{ mb: 2, background: palette.background, borderRadius: 2 }}
                    />
                    <TextField
                        label="E-posta (opsiyonel)"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        sx={{ mb: 2, background: palette.background, borderRadius: 2 }}
                    />
                    <TextField
                        label="Telefon (opsiyonel)"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        fullWidth
                        sx={{ mb: 3, background: palette.background, borderRadius: 2 }}
                    />
                    <StyledButton onClick={handleSubmit} on fullWidth disabled={!name || !seat}>
                        Satın Al
                    </StyledButton>
                </Box>
            </StyledPaper>
        </Container>
    );
};

export default BuyTicket; 