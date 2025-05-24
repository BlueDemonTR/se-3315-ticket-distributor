import { TextField, Button, Box, duration, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import Api from "../lib/Api";
import { useEffect, useState } from 'react';
import storage from '../lib/storage';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const validationSchema = Yup.object({
    name: Yup.string().required('Train name is required.'),
    from: Yup.string().required('Departure is required.'),
    to: Yup.string().required('Arrival is required.'),
    departure: Yup.date().required('Departure Time is required.'),
    arrival: Yup.date().required('Arrival Time is required.'),
    ticketPrice: Yup.number().required('Price is required.').min(0, 'Price must be positive')
});

function AddTrain({ onAdd, onUpdate, defaultValues }) {
    const [stations, setStations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await Api.post('getStations', {});
                setStations(response.stations || []);
            } catch (error) {
                console.error('Error fetching stations:', error);
                setError('Failed to fetch stations');
            }
        };
        fetchStations();
    }, []);

    const initialValues = {
        name: defaultValues?.name || '',
        from: defaultValues?.from || '',
        to: defaultValues?.to || '',
        departure: defaultValues?.departure ? dayjs(defaultValues.departure) : dayjs(),
        arrival: defaultValues?.arrival ? dayjs(defaultValues.arrival) : dayjs(),
        ticketPrice: defaultValues?.ticketPrice || '',
    };

    const handleFormikSubmit = (values, { resetForm }) => {
        setError('');
        const payload = {
            name: values.name,
            from: values.from,
            to: values.to,
            departure: values.departure.toISOString(),
            duration: 1,
            ticketPrice: Number(values.ticketPrice),
            seatNames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        };

        if (defaultValues && onUpdate) {
            onUpdate(payload);
        } else {
            onAdd(payload);
        }
        resetForm();

    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleFormikSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {error && (
                            <Box sx={{ color: 'error.main', mb: 2 }}>
                                {error}
                            </Box>
                        )}
                        <TextField
                            label="Train Name"
                            name="name"
                            variant='outlined'
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            required
                        />
                        <FormControl fullWidth error={touched.from && Boolean(errors.from)}>
                            <InputLabel>Departure Location</InputLabel>
                            <Select
                                name="from"
                                value={values.from}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Departure Location"
                            >
                                {stations.map((station) => (
                                    <MenuItem key={station._id} value={station.name}>
                                        {station.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {touched.from && errors.from && (
                                <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
                                    {errors.from}
                                </Box>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={touched.to && Boolean(errors.to)}>
                            <InputLabel>Arrival Location</InputLabel>
                            <Select
                                name="to"
                                value={values.to}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Arrival Location"
                            >
                                {stations.map((station) => (
                                    <MenuItem key={station._id} value={station.name}>
                                        {station.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {touched.to && errors.to && (
                                <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
                                    {errors.to}
                                </Box>
                            )}
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Departure Time"
                                value={values.departure}
                                onChange={newValue => setFieldValue('departure', newValue ? dayjs(newValue) : dayjs())}
                                slotProps={{
                                    textField: {
                                        error: touched.departure && Boolean(errors.departure),
                                        helperText: touched.departure && errors.departure,
                                        fullWidth: true,
                                        required: true
                                    }
                                }}
                            />
                            <DateTimePicker
                                label="Arrival Time"
                                value={values.arrival}
                                onChange={newValue => setFieldValue('arrival', newValue ? dayjs(newValue) : dayjs())}
                                slotProps={{
                                    textField: {
                                        error: touched.arrival && Boolean(errors.arrival),
                                        helperText: touched.arrival && errors.arrival,
                                        fullWidth: true,
                                        required: true
                                    }
                                }}
                            />
                        </LocalizationProvider>
                        <TextField
                            label="Price"
                            name="ticketPrice"
                            type="number"
                            variant='outlined'
                            value={values.ticketPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.ticketPrice && Boolean(errors.ticketPrice)}
                            helperText={touched.ticketPrice && errors.ticketPrice}
                            InputProps={{
                                startAdornment: '₺'
                            }}
                            required
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                            sx={{
                                bgcolor: '#27187E',
                                '&:hover': {
                                    bgcolor: '#1A1257'
                                }
                            }}
                        >
                            {defaultValues ? 'Update Train' : 'Add Train'}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

export default AddTrain;