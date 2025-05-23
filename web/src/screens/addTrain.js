import React from "react";
import { TextField, Button, Box } from '@mui/material';
import { Form, Formik } from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Tren adı zorunludur'),
    from: Yup.string().required('Kalkış yeri zorunludur'),
    to: Yup.string().required('Varış yeri zorunludur'),
    departure: Yup.string().required('Kalkış saati zorunludur'),
    arrival: Yup.string().required('Varış saati zorunludur'),
    date: Yup.date().required('Tarih zorunludur')
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
                            label="Tren Adı"
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
                            label="Kalkış Yeri"
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
                            label="Varış Yeri"
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
                            label="Kalkış Saati"
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
                            label="Varış Saati"
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
                            label="Tarih"
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
                            {defaultValues ? 'Treni Güncelle' : 'Tren Ekle'}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

export default AddTrain;