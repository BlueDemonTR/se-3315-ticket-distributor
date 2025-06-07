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
import Row from '../components/Row';
import { useEffect } from 'react';
import { Spinner2 } from '../components';
import { addMinutes, format } from 'date-fns';

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
    const [submitLoading, setSubmitLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [seatLayout, setSeatLayout] = useState([]);
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0?5\d{9}$/;

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        setFetchLoading(true)

        const res = await Api.post('getSeats', { train: train._id });
        if (!res) return

        setFetchLoading(false)

        setSeatLayout(res.seats.sort((a, b) => a.number - b.number))
    };

    function handleSelectSeat(number) {
        setSeat(number)
    }

    const handleSubmit = async () => {
        setSubmitLoading(true)
        setEmailError('');
        setPhoneError('');

        let hasError = false;

        if (!name) {
            setError(true);
            hasError = true;
        }

        if (email && !emailRegex.test(email)) {
            setEmailError('Invalid email format');
            hasError = true;
        }

        if (phone && !phoneRegex.test(phone)) {
            setPhoneError('Phone number must start with 5 and be 10 digits long');
            hasError = true;
        }

        if (hasError) {
            setSubmitLoading(false);
            return;
        }

        const normalizedPhone = phone.startsWith('0') ? phone : `0${phone}`;

        const res = await Api.post("buyTicket", { train, number: seat, name, email, phone: normalizedPhone })
        if (!res) return;

        setSubmitLoading(false)
        navigate(`/ticket/${res.ticket._id}`);
    };

    if (!train) {
        return (
            <Container>
                <StyledPaper>
                    <Typography color="error">Train data not found.</Typography>
                </StyledPaper>
            </Container>
        );
    }

    const arrival = addMinutes(new Date(train.departure), train.duration)

    return (
        <Container>
            <StyledPaper>
                <Typography variant="h5" sx={{ color: palette.primary, fontWeight: 700, mb: 2 }}>
                    Buy Ticket
                </Typography>
                <Typography sx={{ color: palette.secondary, mb: 2 }}>
                    {train.name} &mdash;
                    Departure:
                    <b>{format(train.departure, 'd MMM y hh:mm')}</b> |
                    Arrival:
                    <b>{format(arrival, 'd MMM y hh:mm')}</b>
                </Typography>
                <Box mb={3}>
                    <Typography sx={{ color: palette.primary, fontWeight: 600, mb: 1 }}>
                        Select Seat
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
                        <Row wrapFlex>

                            {!fetchLoading ? (
                                seatLayout.map(({ number, _id, occupied }, i) => (
                                    <SeatBox
                                        key={`${i}`}
                                        selected={seat === number}
                                        occupied={occupied}
                                        isEmpty={number === null}
                                        onClick={() => !occupied && handleSelectSeat(number)}
                                    >
                                        {number}
                                    </SeatBox>
                                ))) : (
                                <Spinner2 />
                            )}
                        </Row>
                    </Box>
                </Box>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                        required
                        error={error && !name}
                        helperText={error && !name ? 'Name is required' : ''}
                        sx={{ mb: 2, background: palette.background, borderRadius: 2 }}
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        error={!!emailError}
                        helperText={emailError || 'Optional'}
                        sx={{ mb: 2, background: palette.background, borderRadius: 2 }}
                    />
                    <TextField
                        label="Phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        fullWidth
                        error={!!phoneError}
                        helperText={phoneError || 'Optional (must start with 5 and be 10 digits long)'}
                        sx={{ mb: 3, background: palette.background, borderRadius: 2 }}
                    />
                    {submitLoading ? (
                        <Spinner2 />
                    ) : (
                        <StyledButton onClick={handleSubmit} on fullWidth disabled={!name || !seat}>
                            Buy - {train.ticketPrice}₺
                        </StyledButton>
                    )}
                </Box>
            </StyledPaper>
        </Container>
    );
};

export default BuyTicket; 