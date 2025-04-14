'use client';
import { createTheme} from '@mui/material/styles';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { ReactNode } from "react";

export default function AppTheme({children} : {children : ReactNode}) {
    const theme = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#d0a3f0',
          },
          secondary: {
            main: '#f3c1f1',
          },
          background: {
            default: '#fef6ff',
            paper: '#ffffff',
          },
          text: {
            primary: '#4b375a',
            secondary: '#a98abf',
          },
        },
        typography: {
          fontFamily: `'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'`,
          h1: {
            fontWeight: 600,
            fontSize: '2.5rem',
          },
          h2: {
            fontWeight: 500,
            fontSize: '2rem',
          },
          body1: {
            fontSize: '1rem',
            fontWeight: 400,
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 16,
        },
        components: {
          MuiButton: {
            defaultProps: {
              variant: 'outlined',
            },
            styleOverrides: {
              root: {
                borderRadius: 20,
                padding: '10px 20px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0px 4px 10px rgba(208, 163, 240, 0.3)',
                },
              },
            },
            variants: [
              {
                props: { variant: 'outlined' },
                style: {
                  borderColor: '#f3c1f1',
                  color: '#a85cb3',
                },
              },
            ],
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 20,
                boxShadow: '0px 4px 12px rgba(208, 163, 240, 0.15)',
                padding: '20px',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              outlined: {
                border: 'none',
              },
            },
            variants: [
              {
                props: { variant: 'outlined' },
                style: {
                  '& > *': {
                    border: '2px solid #f3c1f1',
                    color: '#a85cb3',
                    borderRadius: 20,
                    padding: '10px 20px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    textAlign: 'center',
                    display: 'inline-block',
                    textDecoration: 'none',
                  }
                },
              },
            ],
          }    
        },
      });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={(theme) => ({
                body: {
                    backgroundColor: theme.palette.background.default,
                },
            })}/>
            {children}
        </ThemeProvider>
    );
}
