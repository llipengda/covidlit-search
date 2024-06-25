import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export default responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#b71c1c',
        contrastText: '#fff',
        light: '#b71c1c14'
      },
      secondary: {
        main: '#ffffff',
        contrastText: '#000'
      },
      background: {
        paper: '#00000002'
      },
      divider: '#0000003f'
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
      },
      // @ts-expect-error Property 'MuiDateCalendar' does not exist on type 'Components'.
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            backgroundColor: '#fff'
          }
        }
      },
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: '#fff'
          }
        }
      }
    }
  })
)
