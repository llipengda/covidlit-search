import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes
} from '@mui/material/styles'

import App from './App.tsx'
import './index.css'

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#b71c1c',
        contrastText: '#fff'
      },
      secondary: {
        main: '#ffffff'
      }
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              transitionDelay: '9999s',
              transitionProperty: 'background-color, color'
            }
          }
        }
      },
      MuiFilledInput: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: 'inherit',
              WebkitTextFillColor: 'inherit',
              caretColor: 'inherit'
            }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: 'inherit',
              WebkitTextFillColor: 'inherit',
              caretColor: 'inherit'
            }
          }
        }
      }
    }
  })
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
