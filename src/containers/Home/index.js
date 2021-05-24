
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  const classes = useStyles();
  const [isDialog, setIsDialog] = useState();

  const openCloseDialogHandler = show => () => {
    setIsDialog(show);
  }

  return (
    <div className={classes.root} >
      <RegisterBoard setIsDialog={setIsDialog} />
      {
        isDialog &&
        <RegisterDialog
          headerTitle={'Please enter your question!'}
          open={true}
          onClose={openCloseDialogHandler(false)}
        />
      }
    </div >
  );
};

export default Home;
