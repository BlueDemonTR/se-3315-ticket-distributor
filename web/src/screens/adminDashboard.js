import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    TextField,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Modal
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddTrain from './addTrain';
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
    maxWidth: 900,
    marginLeft: 'auto',
    marginRight: 'auto',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: palette.accent,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    padding: '10px 24px',
    borderRadius: 12,
    boxShadow: '0 2px 8px 0 rgba(255,134,0,0.10)',
    '&:hover': {
        backgroundColor: '#e67a00',
    },
}));

const AdminDashboard = () => {
    const [trains, setTrains] = useState([]);
    const [editingTrain, setEditingTrain] = useState(null);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('add');
    const [stations, setStations] = useState([]);

    useEffect(() => {
        async function fetchStations() {
            const res = await Api.post('getStations', {});
            setStations(res?.stations || []);
        }
        fetchStations();
    }, []);

    const getStationName = (id) => stations.find(s => s._id === id)?.name || id;

    const handleAdd = async (newTrain) => {
        console.log(newTrain);
        const res = await Api.post('admin/createTrain', newTrain);
        if (res) {
            setTrains([...trains, res.train]);
            setOpen(false);
        }
    };

    const handleDelete = (id) => {
        setTrains(trains.filter(t => t.id !== id));
    };

    const handleEdit = (train) => {
        setEditingTrain(train);
        setMode('edit');
        setOpen(true);
    };

    const handleUpdate = (updatedTrain) => {
        setTrains(trains.map(t => t.id === updatedTrain.id ? updatedTrain : t));
        setOpen(false);
        setEditingTrain(null);
    };

    const handleOpenAddModal = () => {
        setMode('add');
        setEditingTrain(null);
        setOpen(true);
    };

    return (
        <Container>
            <StyledPaper>
                <Typography variant="h5" sx={{ color: palette.primary, fontWeight: 700, mb: 3 }}>
                    Admin Dashboard
                </Typography>
                <StyledButton onClick={handleOpenAddModal} sx={{ mb: 3 }}>Add train</StyledButton>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Train Name</TableCell>
                                <TableCell>Departure</TableCell>
                                <TableCell>Arrival</TableCell>
                                <TableCell>Departure Time</TableCell>
                                <TableCell>Arrival Time</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trains.map((train) => (
                                <TableRow key={train.id}>
                                    <TableCell>{train.name}</TableCell>
                                    <TableCell>{getStationName(train.from)}</TableCell>
                                    <TableCell>{getStationName(train.to)}</TableCell>
                                    <TableCell>{train.departure}</TableCell>
                                    <TableCell>{train.arrival}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleEdit(train)} sx={{ color: palette.primary }}>✏️</IconButton>
                                        <IconButton onClick={() => handleDelete(train.id)} sx={{ color: palette.accent }}>🗑️</IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography variant="h6" align='center' gutterBottom>
                            {mode === 'edit' ? 'Edit Train' : 'Add Train'}
                        </Typography>
                        <AddTrain
                            defaultValues={editingTrain}
                            onAdd={handleAdd}
                            onUpdate={handleUpdate}
                        />
                    </Box>
                </Modal>
            </StyledPaper>
        </Container>
    );
};

export default AdminDashboard; 