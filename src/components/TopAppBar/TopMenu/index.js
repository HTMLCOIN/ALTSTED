
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TopAppBarLeft from './TopAppBarLeft';
import TopAppBarRight from './TopAppBarRight';

const useStyles = makeStyles(theme => ({
  height: {
    height: '100%'
  },
  LogoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));
const DesktopMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  console.log('kevin===>', open)

  return (
    <>
      <TopAppBarLeft setOpen={setOpen} />
      <div className={classes.LogoContainer}>
      </div>
      <TopAppBarRight />
    </>
  );
};

export default DesktopMenu;
