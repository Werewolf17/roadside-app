import React from 'react'
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Playground from './Playground'

const primaryColor = '#8E2DE2'
const secondaryColor = '#00ca69'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#FFF'
    },
    background: {
      default: '#FFF'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      },
      outlined: {
        padding: '5px 16px',
        borderRadius: '20px',
        border: '2px solid #FFF',
        '&:hover': {
          background: secondaryColor,
          border: `2px solid ${secondaryColor}`
        }
      }
    },
    MuiTypography: {
      h6: {
        fontSize: '1rem'
      }
    }
  },
  typography: {
    fontFamily: 'Montserrat',
    useNextVariants: true
  }
})

const styles = theme => ({
  '@global': {
    '*': {
      padding: 0,
      margin: 0
    }
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Playground />
    </MuiThemeProvider>
  )
}

export default withStyles(styles)(App)
