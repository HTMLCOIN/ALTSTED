
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AppContext } from 'contexts';

import RegisterBoard from './RegisterBoard';
import RegisterDialog from 'components/RegisterDialog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100vh - ${theme.custom.layout.topAppBarHeight}px)`,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Home = () => {
  AOS.init({
    once: true,
    delay: 50,
    duration: 500,
    easing: 'ease-in-out',
  });
  const { account } = useContext(AppContext);
  const classes = useStyles();
  const [isDialog, setIsDialog] = useState();
  const [state, setState] = useState({});

  const openCloseDialogHandler = show => () => {
    setIsDialog(show);
  }

  console.log('kevin account =>', account)
  return (
    <div className={classes.root} >
      <RegisterBoard
        setIsDialog={setIsDialog}
        account={account}
        setState={setState}
        state={state}
      />
      {
        isDialog &&
        <RegisterDialog
          setState={setState}
          statte={state}
          headerTitle={'Connect Altmask Wallet'}
          open={true}
          onClose={openCloseDialogHandler(false)}
        />
      }
    </div >
  );
};

export default Home;
