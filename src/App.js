
import 'typeface-roboto';
import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import loadable from '@loadable/component';
import { SnackbarProvider } from 'notistack';
import pMinDelay from 'p-min-delay';

import theme from 'styles/theme';
import Layout from 'hoc/Layout';
import { AppContext } from 'contexts';
import { PAGES } from 'utils/links/pages';
import WalletModal from 'components/WalletModal';
import LoadingSpinner from 'components/LoadingSpinner'
import Notifications from 'components/Notifications';

import { useQrypto } from 'libs/altmask';
import { isEmpty } from 'utils/utility';

const DELAY_TIME = 100;
const Home = loadable(() => pMinDelay(import('containers/Home'), DELAY_TIME));
const Register = loadable(() => pMinDelay(import('containers/Register'), DELAY_TIME));
const Search = loadable(() => pMinDelay(import('containers/Search'), DELAY_TIME));
const useStyles = makeStyles(() => ({
  primaryTextColor: {
    color: '#fff'
  }
}));

const App = () => {
  const classes = useStyles();


  const [loadingInfo, setLoadingInfo] = useState(false);
  const [layout] = useState(false)
  const [isWalletDialog, setIsWalletDialog] = useState(false);
  const [notificationData, setNotificationData] = useState({
    notifications: [],
    notificationType: ''
  })

  const [htmlState, setHtmlState] = useState({
    extensionId: 'pdcafmmpfphfnngcbpiopmafdjgpbakg',
    extensionInstalled: false,
    connected: false,
    height: 0,
    account: null,
    tolerance: 0.5,
    deadline: 20,
    tokens: [],
    txs: [],
  })

  const openCloseDialogHandler = show => () => {
    setIsWalletDialog(show)
  }

  useEffect(() => {
    if (isWalletDialog) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'unset';
    }
  }, [isWalletDialog])

  return (
    <AppContext.Provider
      value={{
        loadingInfo,
        setLoadingInfo,
        setNotificationData,
        htmlState,
        setHtmlState
      }}>
      <ThemeProvider
        theme={theme}
      >
        <SnackbarProvider
          classes={{
            variantSuccess: classes.primaryTextColor,
            variantError: classes.primaryTextColor,
            variantWarning: classes.primaryTextColor,
            variantInfo: classes.primaryTextColor
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          maxSnack={3}>
          <CssBaseline />
          <Notifications notifications={notificationData.notifications} notificationType={notificationData.notificationType} />
          <Suspense fallback={
            <LoadingSpinner wholeOverlay />}>
            <Layout layout={layout}>
              <Switch>
                <Route render={() => (
                  <Switch>
                    <Route exact path={PAGES.HOME.url} component={Home} />
                    <Route exact path={PAGES.SEARCH.url} component={Search} />
                    <Route exact path={PAGES.REGISTER.url} component={Register} />
                  </Switch>
                )} />
              </Switch>
              {
                isWalletDialog &&
                <WalletModal
                  headerTitle={'Select a Wallet'}
                  open={true}
                  onClose={openCloseDialogHandler(false)}
                />
              }
            </Layout>
          </Suspense>
        </SnackbarProvider>
      </ThemeProvider>
    </AppContext.Provider>
  )
};

export default withRouter(App);