
import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TopAppBar from 'components/TopAppBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.custom.layout.maxAppWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  main: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0, 0, 0, 0)
    },
    flexGrow: 1,
    minHeight: `calc(100vh - ${theme.custom.layout.topAppBarHeight + theme.custom.layout.footerHeight}px)`,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0, 5, 0, 5)
  },
  landingMain: {
    [theme.breakpoints.down('md')]: {

    },
    flexGrow: 1,
    minHeight: `calc(100vh - ${theme.custom.layout.topAppBarHeight + theme.custom.layout.footerHeight}px)`,
    backgroundColor: theme.palette.background.main,
    padding: theme.spacing(0, 5, 0, 5)
  },
  mainPanel: {
    backgroundColor: theme.palette.background.main,
    width: '100%',
    minHeight: `calc(100vh - ${theme.custom.layout.topAppBarHeight + theme.custom.layout.footerHeight}px)`
  }
}));

const Layout = ({ children, layout }) => {
  const classes = useStyles({});

  return (
    <>
      <div className={classes.root}>
        <TopAppBar layout={layout} />
        <main className={layout ? classes.main : classes.landingMain}>
          <div className={classes.mainPanel}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default memo(Layout);