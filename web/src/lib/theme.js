import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#27187E',
            light: '#758BFD',
            dark: '#1A1257',
        },
        secondary: {
            main: '#FF8600',
            light: '#FFA033',
            dark: '#CC6B00',
        },
        background: {
            default: '#F1F2F6',
            paper: '#FFFFFF',
        },
        accent: {
            main: '#AEB8FE',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
    },
});

export default theme; 