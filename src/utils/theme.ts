import { createTheme, responsiveFontSizes } from '@mui/material'

export default responsiveFontSizes(
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
