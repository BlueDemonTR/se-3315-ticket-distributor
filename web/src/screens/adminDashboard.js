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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddTrain from './addTrain';
import Api from '../lib/Api';
import { useDispatch, useSelector } from 'react-redux';
import Col from '../components/Col';
import Row from '../components/Row';
import AddStation from './addStation';
import { format } from 'date-fns';
import ViewTicket from './viewTicket';
import { Spinner2, Modal } from '../components';

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
    const [editingTrain, setEditingTrain] = useState(null);
    const [open, setOpen] = useState(false);
    const [openTicketView, setOpenTicketView] = useState(false);
    const [mode, setMode] = useState('add');
    const stations = useSelector(state => state.stations) ?? [];
    const trains = useSelector(state => state.trains) ?? [];
    const [tickets, setTickets] = useState([]);
    const [ticketLoading, setTicketLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        const res = await Api.post('getStations', {});
        if (!res) return

        dispatch({
            type: 'SET_STATIONS',
            payload: res.stations
        })

        const res1 = await Api.post('getTrains', {});
        if (!res1) return

        dispatch({
            type: 'SET_TRAINS',
            payload: res1.trains
        })
    };

    const getStationName = (id) => stations.find(s => s._id === id)?.name || id;

    const handleAdd = async (newTrain) => {
        const res = await Api.post('admin/createTrain', newTrain);
        if (!res) return

        dispatch({
            type: 'ADD_TRAIN',
            payload: res.train
        })

        setOpen(false);
    };

    const handleDelete = (id) => {
        dispatch({
            type: 'REMOVE_TRAIN',
            payload: { _id: id }
        })
    };

    const handleEdit = (train) => {
        setEditingTrain(train);
        setMode('edit');
        setOpen(true);
    };


    const handleOpenTicketView = async (trainId) => {
        setTicketLoading(true);
        const res = await Api.post('admin/getTickets', { trainId });
        setTicketLoading(false);
        if (!res) return;

        setTickets(res.tickets);
        setOpenTicketView(true);


    }

    function handleRemoveTicket(ticketId) {
        const postfilter = tickets.filter(x => x._id !== ticketId)

        setTickets(postfilter)
    }

    async function createBackup() {
        const res = await Api.get('createBackup')
        if (!res) return

        console.log(res);


    }

    const handleUpdate = async (updatedTrain) => {
        const data = {
            _id: editingTrain._id,
            ...updatedTrain
        }

        const res = await Api.post('admin/editTrain', data);
        if (!res) return

        dispatch({
            type: 'UPDATE_TRAIN',
            payload: res.train
        })

        setOpen(false);
        setEditingTrain(null);
    };

    const handleOpenAddModal = () => {
        setMode('add');
        setEditingTrain(null);
        setOpen(true);
    };

    function formatDeparture(time) {
        if (!time) return

        return format(new Date(time), 'd MMM y hh:mm')
    }

    return (
        <Container>
            <StyledPaper>
                <Typography variant="h5" sx={{ color: palette.primary, fontWeight: 700, mb: 3 }}>
                    Admin Dashboard
                </Typography>

                <Row between>
                    <Row gap='8px'>

                        <StyledButton onClick={handleOpenAddModal} sx={{ mb: 3 }}>Add train</StyledButton>

                        <AddStation />

                    </Row>

                    <StyledButton onClick={createBackup} sx={{ mb: 3 }}>Generate Backup</StyledButton>
                </Row>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Departure</TableCell>
                                <TableCell>Arrival</TableCell>
                                <TableCell>Departure Time</TableCell>
                                <TableCell>Duration (Minutes)</TableCell>
                                <TableCell >Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trains.map((train) => (
                                <TableRow key={train.id}>
                                    <TableCell>{getStationName(train.from)}</TableCell>
                                    <TableCell>{getStationName(train.to)}</TableCell>
                                    <TableCell>{formatDeparture(train.departure)}</TableCell>
                                    <TableCell>{train.duration}</TableCell>
                                    <TableCell>
                                        <Row>
                                            {ticketLoading ? <Col marg={'13px 0 0'} ht={'25px'} wid={'25px'} noFlex> <Spinner2 /> </Col> : <IconButton onClick={() => handleOpenTicketView(train._id)}>🎟️</IconButton>}
                                            <IconButton onClick={() => handleEdit(train)} sx={{ color: palette.primary }}>✏️</IconButton>
                                            <IconButton onClick={() => handleDelete(train._id)} sx={{ color: palette.accent }}>🗑️</IconButton>
                                        </Row>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    visible={open}
                    closeModal={() => setOpen(false)}
                    wid='400px'
                    ht='500px'
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Col pad='12px' wid='calc(100% - 24px)'>
                        <Typography variant="h6" align='center' gutterBottom>
                            {mode === 'edit' ? 'Edit Train' : 'Add Train'}
                        </Typography>
                        <AddTrain
                            defaultValues={editingTrain}
                            onAdd={handleAdd}
                            onUpdate={handleUpdate}
                        />
                    </Col>

                </Modal>

                <Modal
                    visible={openTicketView}
                    closeModal={() => setOpenTicketView(false)}
                    wid='750px'
                    ht='600px'
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Col pad='12px 0 0' center>
                        <Typography variant="h5" align='center' sx={{ color: palette.primary, fontWeight: 700 }} gutterBottom>
                            Tickets
                        </Typography>
                    </Col>
                    {!tickets.length ? <Typography align='center' variant='h5'>No Ticket Has Been Sold.</Typography> : null}
                    <Col center pad='20px'>
                        {tickets.map((ticket, i) => (
                            <ViewTicket
                                key={i}
                                hasCancel={true}
                                mappedTicket={ticket}
                                onCancel={() => handleRemoveTicket(ticket._id)}
                            />
                        ))}
                    </Col>
                </Modal>
            </StyledPaper>
        </Container>
    );
};

export default AdminDashboard; 