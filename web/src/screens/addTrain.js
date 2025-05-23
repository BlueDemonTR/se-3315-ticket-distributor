import React from "react";
import { TextField, Button, Box } from '@mui/material';
import { Form, Formik } from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Train name is required.'),
    from: Yup.string().required('Departure is required.'),
    to: Yup.string().required('Arrival is required.'),
    departure: Yup.string().required('Departure Time is required.'),
    arrival: Yup.string().required('Arrival Time is required.'),
    date: Yup.date().required('Date is required.')
});

function AddTrain({ onAdd, onUpdate, defaultValues }) {
    const initialValues = {
        name: defaultValues?.name || '',
        from: defaultValues?.from || '',
        to: defaultValues?.to || '',
        departure: defaultValues?.departure || '',
        arrival: defaultValues?.arrival || '',
        date: defaultValues?.date || '',
    };

    const handleFormikSubmit = (values, { resetForm }) => {
        const payload = {
            ...values,
            id: defaultValues?.id
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
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                        <TextField
                            label="Departure Location"
                            name="from"
                            variant='outlined'
                            value={values.from}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.from && Boolean(errors.from)}
                            helperText={touched.from && errors.from}
                            required
                        />
                        <TextField
                            label="Arrival Location"
                            name="to"
                            variant='outlined'
                            value={values.to}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.to && Boolean(errors.to)}
                            helperText={touched.to && errors.to}
                            required
                        />
                        <TextField
                            label="Depature Time"
                            name="departure"
                            type="time"
                            variant='outlined'
                            value={values.departure}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.departure && Boolean(errors.departure)}
                            helperText={touched.departure && errors.departure}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            label="Arrival Time"
                            name="arrival"
                            type="time"
                            variant='outlined'
                            value={values.arrival}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.arrival && Boolean(errors.arrival)}
                            helperText={touched.arrival && errors.arrival}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            label="Date"
                            name="date"
                            type="date"
                            variant='outlined'
                            value={values.date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.date && Boolean(errors.date)}
                            helperText={touched.date && errors.date}
                            InputLabelProps={{ shrink: true }}
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