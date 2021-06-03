
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      light: '#292C41',
      main: '#141720',
      dark: '#161A29',
      contrastText: '#fff',
      darkLight: '#292C41',
    },
    secondary: {
      light: '#555e6c',
      main: '#A20F3C',
      dark: '#1e2532',
      contrastText: '#6B76A1'
    },
    error: {
      light: '#EE2741',
      main: '#A20F3C',
      dark: '#860029',
      contrastText: '#fff'
    },
    background: {
      default: '#292C40',
      main: '#1B1F2E',
      sideDrawer: '#0f1118',
      selectedMenu: '#292C4130',
      // main: '#232637',
      overlay: '#00000099'
    },
    text: {
      primary: '#fff',
      // secondary: '#555E7F',
      secondary: '#6B76A1',
      notification: '#8D9BD4',
      inactiveSubMenu: '#92959e',
      hoverText: '#16ACE2'
    },
  },
  custom: {
    palette: {
      green: '#4caf50',
      blueGrey: '#5c739c',
      lightGrey: '#D8D8D8',
      darkRed: '#ba1a48',
      grey: '#99A5D3',
      lightBlue: '#1f2334',
      gold: '#D8A42D',
      darkYellow: '#FFA000',
      hover: '#16ACE2'
    },
    layout: {
      topAppBarHeight: 47,
      footerHeight: 77
    },
  },
  overrides: {
    MuiPopover: {
      root: {
        zIndex: `${3000} !important`,
      },
      paper: {
        background: '#292C41',
      }
    },
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: 'transparent',
        color: '#fff'
      },
      dayLabel: {
        color: '#fff'
      },
      daysHeader: {
        border: `1px solid #555E7F`,
        borderLeft: 'none',
        borderRight: 'none',
        marginLeft: 4,
        marginRight: 4,
        height: 36,
        maxHeight: 36,
      },
      transitionContainer: {
        '& > p': {
          fontSize: 16,
          fontWeight: 500
        }
      }
    },
    MuiPickersDay: {
      daySelected: {
        borderRadius: 0,
        backgroundColor: '#A20F3C4D', // 4D = 30%
        color: '#A20F3C',
        '&:hover': {
          backgroundColor: '#A20F3C4D'
        }
      }
    },
  }
}));

export default theme;
